import * as yup from "yup";

/**
 * validator for add a new sessionSchema
 */

const workoutSchemaPayloadValidator = yup.object().shape({
  default_target: yup.array().required().min(1).of(yup.number().required()),
  workout_id: yup.string().uuid().required(),
  order: yup.number().required(),
});
const addSupersetSchemaPayloadValidator = yup.object().shape({
  name: yup.string().required(),
  order: yup.number().required(),
  superset_workout_schema: yup
    .array()
    .required()
    .of(workoutSchemaPayloadValidator)
    .min(1),
});

export const addSessionSchemaPayloadValidator = yup.object().shape({
  session_name: yup.string().required(),
  schema_blocks: yup
    .array()
    .required()
    .min(1)
    .of(
      yup.lazy((item) => {
        if ("workout_id" in item) return workoutSchemaPayloadValidator;
        else if ("superset_workout_schema" in item)
          return addSupersetSchemaPayloadValidator;
        else
          throw {
            message:
              "Need an instance of workout or superset schema with type field as workout_schema_block | superset_schema_block",
          };
      }) as any
    ),
});



export const submitSessionSchemaForReviewPayloadValidator = yup.object().shape({
  schema_id: yup.string().uuid().required(),
});

export const voteSessionSchemaPayloadValidator = yup.object().shape({
  schema_id: yup.string().uuid().required(),
  state: yup.bool().required(),
});


export const topSessionSchemaPayloadValidator = yup.object().shape({
  cursor_id: yup.string().nullable().uuid(),
});
