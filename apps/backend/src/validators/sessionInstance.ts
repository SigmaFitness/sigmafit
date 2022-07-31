import { workout_type } from "@prisma/client";
import { SessionInstanceAddOrModifyBlockRequest } from "@sigmafit/commons";
import * as yup from "yup";

// TODO: Further ensure that
export const isInstanceDataValid = async (
  workoutType: string,
  data: SessionInstanceAddOrModifyBlockRequest["sets_data"]
) => {
  // type

  if (workoutType !== workout_type.WEIGHT_AND_REPS) {
    data.forEach((values) => {
      if (values.values.length > 1)
        throw {
          message: `Drop sets are only available for ${workout_type.WEIGHT_AND_REPS} type`,
        };
    });
  }

  let schema: any;
  if (
    workoutType === workout_type.REPS ||
    workoutType === workout_type.WEIGHT_AND_REPS
  ) {
    schema = yup.object().shape({
      reps: yup.number().min(0).required(),
    });

    if (workoutType === workout_type.WEIGHT_AND_REPS) {
      schema = schema.shape({
        weight: yup.number().min(0).required(),
      });
    }
  } else {
    schema = yup.object().shape({
      duration: yup.number().min(0).required(),
    });

    if (workoutType === workout_type.DISTANCE_AND_DURATION) {
      schema = schema.shape({
        distance: yup.number().min(0).required(),
      });
    }
  }

  return yup
    .array()
    .required()
    .min(1)
    .of(
      yup.object().shape({
        values: yup.array().required().of(schema).min(1),
      })
    )
    .validate(data);
};

export const isValidSessionInstanceBlock = yup.object().shape({
  id: yup.string().uuid().required(),
  session_instance_id: yup.string().uuid().required(),
  block_type: yup
    .mixed()
    .required()
    .oneOf(["SUPERSET_WORKOUT", "CLASSIC_WORKOUT"]),
  sets_data: yup.array().required().min(1),
});

/**

Data:

data: [
    {
        "values": [
            {
                "weight": xx,
                "reps": xx,
            },
            // All {values} after first instance are DROP SETS;;
            {
                "weight": xx,
                "reps": xx,
            },
                        {
                "weight": xx,
                "reps": xx,
            }
        ]
    }
]
 */
