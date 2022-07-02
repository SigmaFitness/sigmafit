import * as yup from 'yup';



/**
 * validator for add a new sessionSchema
 */

 const workoutSchemaPayloadValidator = yup.object().shape({
    default_target: yup.array().required().min(1).of(yup.number().required()),
    workout_id: yup.string().uuid().required(),
    order: yup.number(), // not required
})
const addSupersetSchemaPayloadValidator = yup.object().shape({
    name: yup.string().required(),
    order: yup.number(), // not required
    superset_workout_schema: yup.array().required().of(workoutSchemaPayloadValidator).min(1)
})

export const addSessionSchemaPayloadValidator = yup.object().shape({
    session_name: yup.string().required(),
    workout_schema: yup.array().of(workoutSchemaPayloadValidator),
    superset_schema: yup.array().of(addSupersetSchemaPayloadValidator)
}, );
