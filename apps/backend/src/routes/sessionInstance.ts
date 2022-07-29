import { prisma } from "../db";
import { response, Router } from "express";
import { sendErrorResponse } from "../utils/sendErrorResponse";
import { isAuthenticated } from "../utils/authMiddlewares";
import { isValidUUID } from "../validators/isValidUUID";
import { v4 } from "uuid";
import {
  isInstanceDataValid,
  isValidSessionInstanceBlock,
} from "../validators/sessionInstance";
import {
  superset_schema,
  superset_workout_instance,
  superset_workout_schema,
  workout_instance,
  workout_schema,
  workout_type,
} from "@prisma/client";
import {
  SessionInstanceAddOrModifyBlockRequest,
  SessionInstanceAddOrModifyBlockResponse,
  SessionInstanceAllActiveResponse,
  SessionInstanceEndResponse,
  SessionInstanceStartResponse,
  SessionInstanceStateResponse,
} from "@sigmafit/commons";
const router = Router();

router.post("/start/", isAuthenticated, async (req, res) => {
  try {
    const sessionSchemaId = req.body.sessionSchemaId;
    if (!(await isValidUUID(sessionSchemaId)))
      throw { message: "sessionSchemaId must be a valid UUID" };

    // fetch sessionSchema
    // checking permissions
    const instance = await prisma.session_schema.findFirst({
      where: {
        id: sessionSchemaId,
        owner_id: req.user.id,
      },
    });

    if (!instance)
      throw {
        status: 401,
        message: `You don't have permissions to make this action.`,
      };

    // you can only create a session if there is no active instance of it
    // check if there's an active session or not
    const isActiveSession = await prisma.session_instance.findFirst({
      where: {
        session_schema_id: sessionSchemaId,
        end_timestamp: null,
      },
      select: {
        id: true,
      },
    });
    if (isActiveSession)
      throw {
        message:
          "Invalid action. There's already an active session for the schema.",
      };

    // create a new session
    const newSessionInstanceData = await prisma.session_instance.create({
      data: {
        id: v4(),
        session_schema_id: sessionSchemaId,
      },
    });

    const response: SessionInstanceStartResponse = {
      ...newSessionInstanceData,
    };
    res.send(response);
  } catch (err) {
    return sendErrorResponse(res, err);
  }
});

/**
 * Route to end the current active session
 */
router.post("/end/", isAuthenticated, async (req, res) => {
  try {
    const activeSessionInstanceId = req.body.activeSessionInstanceId;
    if (!(await isValidUUID(activeSessionInstanceId)))
      throw { message: "activeSessionInstanceId must be a valid UUID" };

    // if (!instance) throw { status: 401, message: `You don't have permissions to make this action.` }

    // you can only create a session if there is no active instance of it
    // check if there's an active session or not
    const updatedDoc = await prisma.session_instance.updateMany({
      where: {
        id: activeSessionInstanceId,
        end_timestamp: null,
        session_schema: {
          owner_id: req.user.id,
        },
      },
      data: {
        end_timestamp: new Date(),
      },
    });

    if (!updatedDoc.count)
      throw {
        message:
          "Invalid activeSessionInstanceId or the session is already inActive or you don't have enough permission. ",
      };

    const response: SessionInstanceEndResponse = {
      message: "Session Instance has been successfully stopped.",
    };
    res.send(response);
  } catch (err) {
    return sendErrorResponse(res, err);
  }
});

/**
 * Route to get the currentState of an active sessionInstanceId
 */
router.get("/state/:sessionInstanceId", isAuthenticated, async (req, res) => {
  try {
    const { sessionInstanceId } = req.params;
    if (!(await isValidUUID(sessionInstanceId)))
      throw { message: "sessionInstanceId must be a valid UUID" };

    const sessionInstance = await prisma.session_instance.findFirst({
      where: {
        id: sessionInstanceId,
        end_timestamp: null,
        session_schema: {
          owner_id: req.user.id,
        },
      },
      include: {
        session_schema: {
          include: {
            superset_schema: {},
          },
        },
      },
    });
    if (!sessionInstance)
      throw {
        message: "Either session is already complete or unauthorized access.",
      };

    const superset_schema_details: Record<string, superset_schema> = {};

    sessionInstance.session_schema.superset_schema.forEach((e) => {
      superset_schema_details[e.id] = e;
    });

    // fetch all workoutOuts

    const workouts = await prisma.$queryRaw`
            SELECT 
                workout_schema.id as superset_or_classic_workout_schema_id,
                workout_schema.workout_id,
                workout_schema.default_target,
                workout_schema.order,
                current_workout_instance.sets_data as current_workout_instance_sets_data,
                prev_workout_instance.sets_data as prev_workout_instance_sets_data,
                'CLASSIC_WORKOUT' as type,
                workout.category as workout_category,
                workout.name as workout_name,
                workout.workout_image_url as workout_image_url,
                NULL as superset_schema_name -- since it's classic workout no superset_schema_name
            FROM workout_schema
            LEFT JOIN 
                workout_instance as current_workout_instance ON current_workout_instance.workout_schema_id = workout_schema.id
                    AND current_workout_instance.session_instance_id=${sessionInstanceId}
            LEFT JOIN 
                (
                    select 
                        workout_instance.sets_data,
                        workout_instance.workout_schema_id
                    from workout_instance
                    inner join session_instance ON session_instance.id  = workout_instance.session_instance_id
                    inner join 
                    (
                        SELECT session_schema_id, max(session_instance.end_timestamp) as maxi
                        FROM session_instance 
                        WHERE session_instance.end_timestamp IS NOT NULL
                        GROUP BY 
                            session_schema_id
                    ) as tmp ON tmp.maxi = session_instance.end_timestamp
                        AND tmp.session_schema_id = session_instance.session_schema_id
                ) as prev_workout_instance ON prev_workout_instance.workout_schema_id = workout_schema.id
            INNER JOIN workout ON workout.id = workout_schema.workout_id
            WHERE workout_schema.session_schema_id = ${sessionInstance.session_schema_id}
            UNION
            SELECT 
                superset_workout_schema.id as superset_or_classic_workout_schema_id,
                superset_workout_schema.workout_id,
                superset_workout_schema.default_target,
                superset_workout_schema.order,
                current_superset_workout_instance.sets_data as current_superset_workout_instance_sets_data,
                prev_superset_workout_instance.sets_data as prev_superset_workout_instance_sets_data,
                'SUPERSET_WORKOUT' as type,
                workout.category as workout_category,
                workout.name as workout_name,
                workout.workout_image_url as workout_image_url,
                superset_schema.name as superset_schema_name
            FROM superset_workout_schema
            INNER JOIN superset_schema ON superset_schema.id = superset_workout_schema.superset_schema_id 
                    AND superset_schema.session_schema_id = ${sessionInstance.session_schema_id}
            LEFT JOIN 
                superset_workout_instance as current_superset_workout_instance ON current_superset_workout_instance.superset_workout_schema_id = superset_workout_schema.id
                    AND current_superset_workout_instance.session_instance_id=${sessionInstanceId}
            LEFT JOIN 
                (
                    select 
                        superset_workout_instance.sets_data,
                        superset_workout_instance.superset_workout_schema_id
                    from superset_workout_instance
                    inner join session_instance ON session_instance.id  = superset_workout_instance.session_instance_id
                    inner join 
                    (
                        SELECT session_schema_id, max(session_instance.end_timestamp) as maxi
                        FROM session_instance 
                        WHERE session_instance.end_timestamp IS NOT NULL
                        GROUP BY 
                            session_schema_id
                    ) as tmp ON tmp.maxi = session_instance.end_timestamp
                        AND tmp.session_schema_id = session_instance.session_schema_id
                ) as prev_superset_workout_instance ON prev_superset_workout_instance.superset_workout_schema_id = superset_workout_schema.id
            INNER JOIN workout ON workout.id = superset_workout_schema.workout_id

            ORDER BY "order" -- it's applied on whole UNION
        `;

    const response: SessionInstanceStateResponse = {
      superset_schema_details,
      session_workouts: workouts as any,
      session_instance_details: {
        schema_name: sessionInstance.session_schema.name,
        end_timestamp: sessionInstance.end_timestamp,
        start_timestamp: sessionInstance.start_timestamp,
      },
    };
    res.send(response);
  } catch (err) {
    return sendErrorResponse(res, err);
  }
});

/**
 * Route to add or modify block
 */
router.post("/addOrModifyBlock/", isAuthenticated, async (req, res) => {
  try {
    const data: SessionInstanceAddOrModifyBlockRequest = req.body;

    // TODO: Make a check that if the session has ended then we cannot change it? Shall we do it or not?
    await isValidSessionInstanceBlock.validate(data);

    // fetch block data
    let blockData: (workout_schema | superset_workout_schema) & {
      workout: {
        category: workout_type;
      };
    };

    if (data.block_type === "CLASSIC_WORKOUT") {
      blockData = await prisma.workout_schema.findFirst({
        where: {
          id: data.id,
          // TODO: SOME OWNER CHECK
        },
        include: {
          workout: {
            select: {
              category: true,
            },
          },
        },
      });
      // blockData.workout
    } else {
      blockData = await prisma.superset_workout_schema.findFirst({
        where: {
          id: data.id,
          // TODO: SOME OWNER CHECK
        },
        include: {
          workout: {
            select: {
              category: true,
            },
          },
        },
      });
    }

    if (!blockData)
      throw {
        message:
          "check the workout_schema_id or the superset_workout_schema_id",
      };

    const validatedSetsData = await isInstanceDataValid(
      blockData.workout.category,
      data.sets_data
    );
    // blocks can be of supersetWorkoutInstance or workoutInstance

    let addedOrUpdatedBlock: workout_instance | superset_workout_instance;
    if (data.block_type === "CLASSIC_WORKOUT") {
      addedOrUpdatedBlock = await prisma.workout_instance.upsert({
        where: {
          session_instance_id_workout_schema_id: {
            session_instance_id: data.session_instance_id,
            workout_schema_id: data.id,
          },
        },
        update: {
          sets_data: data.sets_data,
        },
        create: {
          sets_data: data.sets_data,
          session_instance_id: data.session_instance_id,
          workout_schema_id: data.id,
        },
      });
    } else {
      addedOrUpdatedBlock = await prisma.superset_workout_instance.upsert({
        where: {
          session_instance_id_superset_workout_schema_id: {
            session_instance_id: data.session_instance_id,
            superset_workout_schema_id: data.id,
          },
        },
        update: {
          sets_data: data.sets_data,
        },
        create: {
          sets_data: data.sets_data,
          session_instance_id: data.session_instance_id,
          superset_workout_schema_id: data.id,
        },
      });
    }

    const response: SessionInstanceAddOrModifyBlockResponse =
      addedOrUpdatedBlock;
    res.send(response);
  } catch (err) {
    return sendErrorResponse(res, err);
  }
});

router.get("/allActive/", isAuthenticated, async (req, res) => {
  try {
    const activeInstances = await prisma.session_instance.findMany({
      where: {
        end_timestamp: null,
        session_schema: {
          owner_id: req.user.id,
        },
      },
      include: {
        session_schema: {
          select: {
            owner_id: true,
            name: true,
          },
        },
      },
    });
    const response: SessionInstanceAllActiveResponse = activeInstances;
    res.send(response);
  } catch (err) {
    return sendErrorResponse(res, err);
  }
});

export default router;
