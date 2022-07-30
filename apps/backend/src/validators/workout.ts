import { body_part, intensity_levels, workout_type } from "@prisma/client";
import * as yup from "yup";

/**
 * validator for add a new (private) workout
 */
export const addOrModifyWorkoutPayloadValidator = yup.object().shape({
  id: yup.string().uuid(),
  name: yup.string().required(),
  category: yup.mixed().required().oneOf(Object.keys(workout_type)),
  target_body_part: yup.mixed().oneOf(Object.keys(body_part)),
  intensity: yup.mixed().oneOf(Object.keys(intensity_levels)),
  workout_image_url: yup.string().url(),
  notes: yup.string(),
});

export const deleteWorkoutPayloadValidator = yup.object().shape({
  id: yup.string().uuid().required(),
});
