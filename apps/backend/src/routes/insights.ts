import { prisma } from "../db";
import { Router } from "express";
import { sendErrorResponse } from "../utils/sendErrorResponse";
import { isAuthenticated } from "../utils/authMiddlewares";
import {
  Insights_Workout_Request,
  Insights_Workout_Response,
  SessionInstanceState_SetData,
} from "@sigmafit/commons";
import { workoutInsightsPayloadValidator } from "../validators/insights";
const router = Router();

/**
 * Workout insights
 */
router.post("/workout", isAuthenticated, async (req, res) => {
  try {
    const validatedData: Insights_Workout_Request =
      workoutInsightsPayloadValidator.validateSync(req.body);

    // check that either the workout is owned by this person or it's public
    const workoutInstance = await prisma.workout.findFirst({
      where: {
        id: validatedData.workout_id,
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
    if (!workoutInstance) throw { message: "Invalid attempt!" };
    type nice_type = {
      workout_id: string;
      sets_data: SessionInstanceState_SetData[];
      start_timestamp: string;
      end_timestamp: string;
      block_type: "NORMAL" | "SUPERSET";
    };

    const data: nice_type[] = await prisma.$queryRaw`
            SELECT 
                workout_schema.workout_id,
                workout_instance.sets_data,
                session_instance.start_timestamp,
                session_instance.end_timestamp,
                'NORMAL' as block_type
            FROM workout_schema
            INNER JOIN workout_instance ON workout_instance.workout_schema_id = workout_schema.id
            INNER JOIN session_instance ON session_instance.id = workout_instance.session_instance_id
            WHERE workout_id=${validatedData.workout_id}
            UNION
            SELECT 
                superset_workout_schema.workout_id,
                superset_workout_instance.sets_data,
                session_instance.start_timestamp,
                session_instance.end_timestamp,
                'SUPERSET' as block_type
            FROM superset_workout_schema
            INNER JOIN superset_workout_instance ON superset_workout_instance.superset_workout_schema_id = superset_workout_schema.id
            INNER JOIN session_instance ON session_instance.id = superset_workout_instance.session_instance_id
            WHERE workout_id=${validatedData.workout_id}
            ORDER BY start_timestamp`;

    // const supersetData: nice_type[] = await prisma.$queryRaw`
    //     `;

    const buildDataPoints = (data: nice_type[]) => {
      const dataPoints: Insights_Workout_Response["dataPoints"] = [];

      for (const workoutInstance of data) {
        for (const set_data of workoutInstance.sets_data) {
          // first instance of the set is normal
          // all others are dropset

          set_data.values.forEach((f, indx) => {
            dataPoints.push({
              date: new Date(workoutInstance.start_timestamp).toDateString(),
              setValue: set_data.values[0],
              type: indx === 0 ? workoutInstance.block_type : "DROPSET",
            });
          });
        }
      }
      return dataPoints;
    };

    // const dataPoints: Insights_Workout_Response['dataPoints'][] = data.map(e => (
    //     [
    //         e.sets_data.map(f => ({
    //             date: 'string',
    //             setValue: f.values[0],
    //             type: 'NORMAL'
    //         }))
    //     ]
    // ))
    const resp: Insights_Workout_Response = {
      workout_type: workoutInstance.category,
      dataPoints: buildDataPoints(data),
    };
    res.send(resp);
  } catch (err) {
    sendErrorResponse(res, err);
  }
});
export default router;
