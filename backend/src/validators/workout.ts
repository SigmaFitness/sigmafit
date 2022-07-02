import { body_part, intensity_levels, workout_type } from '@prisma/client';
import * as yup from 'yup';


// let workout_type111: {
//     WEIGHT_AND_REPS: 'WEIGHT_AND_REPS';
//     REPS: 'REPS';
//     DISTANCE_AND_DURATION: 'DISTANCE_AND_DURATION';
//     DURATION: 'DURATION';
// } = 'WEIGHT_AND_REPS'

// workout_type111


const tmp= workout_type;

/**
 * validator for add a new (private) workout
 */
export const addWorkoutPayloadValidator = yup.object().shape({
    name: yup.string().required(),
    category: yup.mixed().required().oneOf(Object.keys(workout_type)),
    target_body_part: yup.mixed().oneOf(Object.keys(body_part)),
    intensity: yup.mixed().oneOf(Object.keys(intensity_levels)),
});

/**
 * validator to add a modify an existing workout
 */
export const modifyWorkoutPayloadValidator =addWorkoutPayloadValidator.shape({
    id: yup.string().uuid().required(),
    category: yup.string() // making category not mandatory
});
