/**
 * Client
 **/

/**
 * Model user
 *
 */
export type user = {
  id: string;
  first_name: string;
  last_name: string;
  picture: string;
  email: string;
  is_google_connected: boolean;
  is_github_connected: boolean;
  is_twitter_connected: boolean;
  created_time: Date;
  last_token_generated_at: Date;
};

/**
 * Model workout
 *
 */
export type workout = {
  id: string;
  name: string;
  category: workout_type;
  target_body_part: body_part | null;
  workout_image_url: string;
  intensity: intensity_levels | null;
  owner_id: string;
  is_public: boolean;
  notes: string;
};

/**
 * Model session_schema
 *
 */
export type session_schema = {
  id: string;
  name: string;
  owner_id: string;
  state: schema_state;
  votes_count: number;
  number_of_workouts: number;
  number_of_superset_workouts: number;
  number_of_workouts_in_superset: number;
};

/**
 * Model session_schema_vote_by_user
 *
 */
export type session_schema_vote_by_user = {
  user_id: string;
  session_schema_id: string;
  voted_at: Date;
};

/**
 * Model workout_schema
 *
 */
export type workout_schema = {
  id: string;
  session_schema_id: string;
  workout_id: string;
  default_target: any;
  order: number;
};

/**
 * Model superset_schema
 *
 */
export type superset_schema = {
  id: string;
  name: string;
  session_schema_id: string;
};

/**
 * Model superset_workout_schema
 *
 */
export type superset_workout_schema = {
  id: string;
  superset_schema_id: string;
  workout_id: string;
  default_target: any;
  order: number;
};

/**
 * Model session_instance
 *
 */
export type session_instance = {
  id: string;
  session_schema_id: string;
  start_timestamp: Date;
  end_timestamp: Date | null;
};

/**
 * Model workout_instance
 *
 */
export type workout_instance = {
  workout_schema_id: string;
  session_instance_id: string;
  sets_data: any;
};

/**
 * Model superset_workout_instance
 *
 */
export type superset_workout_instance = {
  superset_workout_schema_id: string;
  session_instance_id: string;
  sets_data: any;
};

/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export let workout_type: {
  WEIGHT_AND_REPS: "WEIGHT_AND_REPS";
  REPS: "REPS";
  DISTANCE_AND_DURATION: "DISTANCE_AND_DURATION";
  DURATION: "DURATION";
};

export type workout_type = typeof workout_type[keyof typeof workout_type];

export let body_part: {
  ABS: "ABS";
  BICEPS: "BICEPS";
  TRICEPS: "TRICEPS";
  BACK: "BACK";
  CARDIO: "CARDIO";
  CHEST: "CHEST";
  CORE: "CORE";
  FOREARMS: "FOREARMS";
  FULL_BODY: "FULL_BODY";
  LEGS: "LEGS";
  CALFS: "CALFS";
  SHOULDERS: "SHOULDERS";
  TRAPS: "TRAPS";
  OTHERS: "OTHERS";
};

export type body_part = typeof body_part[keyof typeof body_part];

export let intensity_levels: {
  VERY_HARD: "VERY_HARD";
  HARD: "HARD";
  MEDIUM: "MEDIUM";
  EASY: "EASY";
  WARMUP: "WARMUP";
};

export type intensity_levels =
  typeof intensity_levels[keyof typeof intensity_levels];

export let schema_state: {
  PRIVATE: "PRIVATE";
  PUBLIC: "PUBLIC";
  REVIEW: "REVIEW";
};

export type schema_state = typeof schema_state[keyof typeof schema_state];
