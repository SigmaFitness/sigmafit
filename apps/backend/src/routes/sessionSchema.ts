import { prisma } from "../db";
import { Router } from "express";
import { sendErrorResponse } from "../utils/sendErrorResponse";
import { isAuthenticated, isAuthenticatedWithoutErr } from "../utils/authMiddlewares";
import * as yup from "yup";
import { addSessionSchemaPayloadValidator, submitSessionSchemaForReviewPayloadValidator, topSessionSchemaPayloadValidator, voteSessionSchemaPayloadValidator } from "../validators/sessionSchema";
import { v4 } from "uuid";
import { isValidUUID } from "../validators/isValidUUID";
import {
  create_session_schema__superset_schema,
  create_session_schema__workout_schema,
  SessionSchemaAllResponse,
  SessionSchemaCreateRequest,
  SessionSchemaCreateResponse,
  SessionSchemaDetailsResponse,
  SessionSchemaVoteRequest,
  SessionSchemaVoteResponse,
  SessionSchema_SubmitForReview_Request,
  SessionSchema_SubmitForReview_Response,
  SessionSchema_Top_Request,
  SessionSchema_Top_Response,
} from "@sigmafit/commons";

const router = Router();

/**
 * Route to get the complete details of the sessionSchema
 * 
 * The user can see the public schema data or can get the details of schema owned by him/her
 */
router.get("/details/:id", isAuthenticatedWithoutErr, async (req, res) => {
  try {
    const { id } = req.params;
    const validationResult = await isValidUUID(id);
    if (!validationResult)
      throw { message: `Given id ${id} is not a valid UUID` };

    // check if the session owner is this user is done automatically as we added owner_id
    const data = await prisma.session_schema.findFirst({
      where: {
        id,
        OR: [
          {
            owner_id: req.user?.id,
          },
          {
            state: 'PUBLIC'
          }
        ]
      },
      include: {
        workout_schema: {
          include: {
            workout: {
              select: {
                name: true
              }
            }
          }
        },
        superset_schema: {
          include: {
            superset_workout_schema: {
              include: {
                workout: {
                  select: {
                    name: true
                  }
                }
              },
            },
          },
        },
      }
    });

    if (!data) throw { message: "Invalid Id or permissions" };

    const resp: SessionSchemaDetailsResponse = {
      schema_blocks: [...data.workout_schema, ...data.superset_schema].sort((a, b) => (a.order - b.order)),
      session_name: data.name,
      state: data.state,
      number_of_superset_workouts: data.number_of_superset_workouts,
      number_of_workouts: data.number_of_workouts,
      number_of_workouts_in_superset: data.number_of_workouts_in_superset,
      votes_count: data.votes_count,
      id: data.id,
      // response_type: (data.is_public? 'public': 'owned')

    };

    res.send(resp);
  } catch (err) {
    return sendErrorResponse(res, err);
  }
});

/**
 * Public route to get the schema details to be used for cloning
 */
router.get('/clone/:id', async (req, res) => {

})

/**
 * Route to create a new sessionSchema
 */
router.post("/create/", isAuthenticated, async (req, res) => {
  try {
    const data = req.body;

    const validatedData: SessionSchemaCreateRequest =
      await addSessionSchemaPayloadValidator.validate(data);

    const sessionSchemaId = v4();
    // perform check to ensure that all workout ids are correct
    const workoutIdsToSchemaBlock: Record<string, create_session_schema__workout_schema[]> = {};
    let number_of_superset_workouts = 0, number_of_workouts = 0, number_of_workouts_in_superset = 0

    validatedData.schema_blocks.forEach((currSchemaBlock) => {
      if ("workout_id" in currSchemaBlock) {
        // workout block
        if (!workoutIdsToSchemaBlock[currSchemaBlock.workout_id])
          workoutIdsToSchemaBlock[currSchemaBlock.workout_id] = [];
        workoutIdsToSchemaBlock[currSchemaBlock.workout_id].push(
          currSchemaBlock
        );
        number_of_workouts++;
      } else {
        number_of_superset_workouts++;
        number_of_workouts_in_superset += currSchemaBlock.superset_workout_schema.length
        // superset block
        currSchemaBlock.superset_workout_schema.map((workout: any) => {
          if (!workoutIdsToSchemaBlock[workout.workout_id])
            workoutIdsToSchemaBlock[workout.workout_id] = [];
          workoutIdsToSchemaBlock[workout.workout_id].push(workout);
        });
      }
    });

    const uniqueWorkoutIdsArr = Object.keys(workoutIdsToSchemaBlock);
    const validWorkouts = await prisma.workout.findMany({
      where: {
        AND: [
          {
            id: {
              in: uniqueWorkoutIdsArr,
            },
          },
          {
            OR: [
              {
                is_public: true,
              },
              {
                owner_id: req.user.id,
              },
            ],
          },
        ],
      },
      select: {
        id: true,
        category: true,
      },
    });

    uniqueWorkoutIdsArr.forEach((e) => {
      const workout = validWorkouts.find((f) => f.id === e);
      if (!workout) throw { message: `Invalid Workout Id ${e}` };

      const toAddSchemaBlocks = workoutIdsToSchemaBlock[e];
      if (
        workout.category === "WEIGHT_AND_REPS" ||
        workout.category === "REPS"
      ) {
        // only integer allowed
        toAddSchemaBlocks.forEach((block) => {
          const res = yup
            .array()
            .of(yup.number().required().integer())
            .isValidSync(block.default_target);
          if (!res)
            throw {
              message: `${JSON.stringify(block)} is invalid. ${workout.category
                } should have all integers as target.`,
            };
        });
      }
    });




    // create the schema
    // we don't need to validate the workout_id, thanks to the referential integrity (but we don't have it in prod (using planetscale) for perf reasons)
    const response: SessionSchemaCreateResponse = await prisma.$transaction(
      async (prisma) => {
        const returnData: SessionSchemaCreateResponse = {
          session_schema: null,
          blocks: [],
        };
        returnData.session_schema = await prisma.session_schema.create({
          data: {
            id: sessionSchemaId,
            name: validatedData.session_name,
            owner_id: req.user.id,
            number_of_superset_workouts,
            number_of_workouts,
            number_of_workouts_in_superset
          },
        });

        // handle superset
        const handleSuperset = async (supersetSchema: create_session_schema__superset_schema) => {
          const supersetId = v4();
          let supersetSchemaRet: any = {};
          // create superset
          const createdSupersetDoc = await prisma.superset_schema.create({
            data: {
              id: supersetId,
              name: supersetSchema.name,
              session_schema_id: sessionSchemaId,
              order: Number(supersetSchema.order)
            },
          });

          supersetSchemaRet = {
            ...supersetSchemaRet,
            createdSupersetDoc,
          };
          supersetSchemaRet.superset_workout_schema = [];

          for (let workout of supersetSchema.superset_workout_schema) {
            supersetSchemaRet.superset_workout_schema.push(
              await prisma.superset_workout_schema.create({
                data: {
                  default_target: workout.default_target,
                  id: v4(),
                  order: Number(workout.order),
                  superset_schema_id: supersetId,
                  workout_id: workout.workout_id,
                },
              })
            );
          }

          returnData.blocks.push(supersetSchemaRet);
        };

        // add workout
        const handleWorkout = async (workout: create_session_schema__workout_schema) => {
          const doc = await prisma.workout_schema.create({
            data: {
              default_target: workout.default_target,
              id: v4(),
              session_schema_id: sessionSchemaId,
              order: Number(workout.order),
              workout_id: workout.workout_id,
            },
          });
          returnData.blocks.push(doc);
        };

        for (const block of validatedData.schema_blocks) {
          if ("workout_id" in block) {
            await handleWorkout(block);
          } else {
            await handleSuperset(block);
          }
        }

        return returnData;
      }
    );

    res.send(response);
  } catch (err) {
    return sendErrorResponse(res, err);
  }
});


/**
 * Route to submit the sessionSchema for review
 */
router.post("/submit_for_review/", isAuthenticated, async (req, res) => {
  try {
    const validatedData: SessionSchema_SubmitForReview_Request = submitSessionSchemaForReviewPayloadValidator.validateSync(req.body)

    const response = await prisma.session_schema.updateMany({
      where: {
        id: validatedData.schema_id,
        owner_id: req.user.id,
        state: 'PRIVATE'
      },
      data: {
        state: 'REVIEW'
      }
    })

    if (response.count !== 1) throw { message: `It turns out there are ${response.count} docs. It should've been 1!` }

    const responsePayload: SessionSchema_SubmitForReview_Response = {
      message: `schema successfully submitted for review`
    }
    res.send(responsePayload)
  } catch (err) {
    return sendErrorResponse(res, err);
  }
});


/**
 * Route to vote a sessionSchema
 */
router.post("/vote/", isAuthenticated, async (req, res) => {
  try {
    const validatedData: SessionSchemaVoteRequest = voteSessionSchemaPayloadValidator.validateSync(req.body)

    let voteDetails: SessionSchemaVoteResponse = null;
    if (validatedData.state) {
      // the user wants to vote
      voteDetails = await prisma.session_schema_vote_by_user.create({
        data: {
          user_id: req.user.id,
          session_schema_id: validatedData.schema_id,
          voted_at: new Date()
        },
      })

    } else {
      // delete it
      await prisma.session_schema_vote_by_user.delete({
        where: {
          user_id_session_schema_id: {
            user_id: req.user.id,
            session_schema_id: validatedData.schema_id
          },
        },
      })
    }

    await prisma.session_schema.update({
      where: {
        id: validatedData.schema_id
      },
      data: {
        votes_count: {
          increment: (voteDetails === null ? -1 : 1)
        }
      }
    })

    res.send({
      voteDetails
    })
  } catch (err) {
    return sendErrorResponse(res, err);
  }
});

/**
 * Route to edit the sessionSchema
 */
router.post("/edit/", isAuthenticated, async (req, res) => {
  try {
    // TODO: maybe we can merge it with endpoint to create/; Since we anyhow want both modify and create to give the whole
    // data in one go!
    // But how do we remove the removed items and all?
    throw { message: "Editing schema is disabled for now." };
  } catch (err) {
    return sendErrorResponse(res, err);
  }
});

/**
 * Route to get all sessionSchema owned by the user
 */
router.get("/all/", isAuthenticated, async (req, res) => {
  try {
    let schemas: {
      id: string;
      name: string;
      last_attempted_at: Date;
    }[] = await prisma.$queryRaw`SELECT session_schema.id, session_schema.name,  max(start_timestamp) as last_attempted_at
        FROM session_schema
        LEFT JOIN session_instance ON session_instance.session_schema_id = session_schema.id
        WHERE session_schema.owner_id=${req.user.id}
        GROUP BY session_schema.id, session_schema.name`;

    const ids = schemas.map((e) => e.id);

    const activeIds = await prisma.session_instance.findMany({
      where: {
        end_timestamp: null,
      },
      select: {
        id: true,
        session_schema_id: true,
        end_timestamp: true,
      },
    });

    const response: SessionSchemaAllResponse = schemas.map((e: any) => {
      const found = activeIds.find((sessionInstance) => {
        return sessionInstance.session_schema_id === e.id;
      });

      if (found) return { ...e, end_timestamp: found.end_timestamp };
      return e;
    });
    res.send(response);
  } catch (err) {
    return sendErrorResponse(res, err);
  }
});


/**
 * Route to get top sessionSchema which are public
 */
router.post("/top/", isAuthenticated, async (req, res) => {
  try {
    const validatedData:SessionSchema_Top_Request=topSessionSchemaPayloadValidator.validateSync(req.body)

    const limit = 5;
    const topSessionSchemas = await prisma.session_schema.findMany({
      take: (limit + 1), 
      where: {
        state: 'PUBLIC',
      },
      ...(validatedData.cursor_id ? {
        cursor: {
          id: validatedData.cursor_id
        },
        // Don't skip any
      } : {}),
      select: {
        id: true,
        number_of_superset_workouts: true,
        number_of_workouts: true,
        number_of_workouts_in_superset: true,
        name: true,
        votes_count: true,
        session_schema_vote_by_user: {
          where: {
            user_id: req.user.id
          },
        },
        owner: {
          select: {
            first_name: true,
          }
        }
      },
      orderBy: [
        {
          votes_count: 'desc'
        },
        {
          id: 'asc'
        },
      ]
    })

    const response: SessionSchema_Top_Response = {
      results: (topSessionSchemas.length === limit + 1 ? topSessionSchemas.slice(0, -1) : topSessionSchemas),
      next_cursor: (topSessionSchemas.length === limit + 1 ? topSessionSchemas[topSessionSchemas.length - 1].id : null),
    }

    res.send(response);
  } catch (err) {
    return sendErrorResponse(res, err);
  }
});

export default router;
