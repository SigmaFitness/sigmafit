import { body_part, intensity_levels, workout_type } from "../prismaGenTypes";

export type Workout_AddOrModify_Request = {
  name: string;
  category: keyof typeof workout_type;
  target_body_part?: keyof typeof body_part;
  intensity?: keyof typeof intensity_levels;
  workout_image_url?: string;
  notes: string;
  id?: string;
};
