import { prisma } from "../db";
import { Router } from "express";
import { sendErrorResponse } from "../utils/sendErrorResponse";
import { isAuthenticated } from "../utils/authMiddlewares";

import {
  WorkoutFormOptionsResponse,
  WorkoutListResponse,
  Workout_AddOrModify_Response,
  Workout_Delete_Response,
} from "@sigmafit/commons";
import {
  body_part,
  intensity_levels,
  workout,
  workout_type,
} from "@prisma/client";
import {
  addOrModifyWorkoutPayloadValidator,
  deleteWorkoutPayloadValidator,
} from "../validators/workout";
import { v4 } from "uuid";

const router = Router();

/**
 * Route to list all workouts
 */
router.get("/list/", isAuthenticated, async (req, res) => {
  try {
    const workouts = await prisma.workout.findMany({
      where: {
        OR: [
          {
            owner_id: req.user.id,
          },
          {
            is_public: true,
          },
        ],
      },
    });

    const publicWorkouts: workout[] = [];
    const myWorkouts: workout[] = [];
    workouts.forEach((e) => {
      // we're giving priority to is_public; if the workout is public, then we shall not allow any edits!
      if (e.is_public) publicWorkouts.push(e);
      else if (e.owner_id === req.user.id) myWorkouts.push(e);
    });

    const response: WorkoutListResponse = {
      publicWorkouts,
      myWorkouts,
    };
    res.send(response);
  } catch (err) {
    return sendErrorResponse(res, err);
  }
});

/**
 * Route to add a workout
 * The workout will be private to the user
 */
router.post("/addOrModify/", isAuthenticated, async (req, res) => {
  try {
    const validatedData = await addOrModifyWorkoutPayloadValidator.validate(
      req.body
    );
    // We're adding the url here, but it has no security threat, as the workout is inaccessible to others until we make it public!

    // Create Mode
    let response: Workout_AddOrModify_Response;

    if (!validatedData.id) {
      // Note: we're not using upsert since we want to check the owner too! (somehow prisma don't allow that)
      const workout = await prisma.workout.create({
        data: {
          category: validatedData.category,
          id: v4(),
          name: validatedData.name,
          intensity: validatedData.intensity,
          owner_id: req.user.id,
          target_body_part: validatedData.target_body_part,
          notes: validatedData.notes,
          workout_image_url: validatedData.workout_image_url,
        },
      });
      response = {
        workout,
        mode: "CREATE",
      };
    } else {
      const workout = await prisma.workout.update({
        where: {
          id: validatedData.id,
        },
        data: {
          category: validatedData.category,
          name: validatedData.name,
          intensity: validatedData.intensity,
          owner_id: req.user.id,
          target_body_part: validatedData.target_body_part,
          notes: validatedData.notes,
          workout_image_url: validatedData.workout_image_url,
        },
      });
      response = {
        workout,
        mode: "EDIT",
      };
    }

    res.send(response);
  } catch (err) {
    return sendErrorResponse(res, err);
  }
});

/**
 * Route to modify a workout added by the user
 *
 */
router.post("/modify/", isAuthenticated, async (req, res) => {
  try {
    // REASON: Why do we want the person to be able to modify? These are very basic things. Keep things simple
    throw { status: 400, message: "Not allowed for now!" };

    // const data = req.body;
    // if (data.category) {
    //   // category cannot be changed
    //   throw {
    //     status: 400,
    //     message:
    //       "Category cannot be changed! Please consider adding new workout",
    //   };
    // }
    // await modifyWorkoutPayloadValidator.validate(data);
    // // TODO: Think of a way to dynamically add a favicon; Maybe we just consider the body type to have one?

    // const result = await prisma.workout.updateMany({
    //   where: {
    //     owner_id: req.user.id,
    //     id: data.id,
    //   },
    //   data: {
    //     name: data.name,
    //     // Note: No category here
    //     intensity: data.intensity,
    //     target_body_part: data.target_body_part,
    //   },
    // });

    // if (result.count > 1)
    //   throw {
    //     status: 400,
    //     message: "Logic Error. The developers needs to be fired!",
    //   };
    // else if (result.count == 0)
    //   throw { status: 400, message: "Invalid workout id or permission" };

    // const workout = await prisma.workout.findFirst({
    //   where: {
    //     id: data.id,
    //     owner_id: req.user.id,
    //   },
    // });

    // res.send({
    //   workout,
    // });
  } catch (err) {
    return sendErrorResponse(res, err);
  }
});

/**
 * Route to delete a workout is removed.
 *
 * Any workout added cannot be removed. It ensures that any shared schema workouts are always safe!
 */
router.post("/delete", isAuthenticated, async (req, res) => {
  try {
    const validatedData = deleteWorkoutPayloadValidator.validateSync(req.body);
    // there is no
    const workoutInstance = await prisma.workout.findFirst({
      where: {
        id: validatedData.id,
        owner_id: req.user.id,
        is_public: false,
      },
    });

    if (!workoutInstance)
      throw { message: "Invalid attempt to delete workout!" };

    // check that nobody is using it
    let workoutDoc = await prisma.workout_schema.findFirst({
      where: {
        workout_id: validatedData.id,
      },
    });

    if (workoutDoc)
      throw {
        message: `This workout is being used by one of the workout routine!`,
      };

    let supersetWorkoutDoc = await prisma.superset_workout_schema.findFirst({
      where: {
        workout_id: validatedData.id,
      },
    });

    if (supersetWorkoutDoc)
      throw {
        message: `This workout is being used by one of the workout routine!`,
      };

    // delete the workout
    await prisma.workout.delete({
      where: {
        id: validatedData.id,
      },
    });

    const resp: Workout_Delete_Response = {
      message: `workout ${workoutInstance.name} deleted successfully!`,
      deleted_workout_id: workoutInstance.id,
    };
    res.send(resp);
  } catch (err) {
    return sendErrorResponse(res, err);
  }
});

/**
 * Route to send all the form options to add a new form
 */
router.get("/formOptions/", isAuthenticated, (req, res) => {
  // type a=
  const response: WorkoutFormOptionsResponse = {
    category: Object.keys(workout_type) as any,
    target_body_part: Object.keys(body_part) as any,
    intensity: Object.keys(intensity_levels) as any,
  };

  res.send(response);
});

export default router;
