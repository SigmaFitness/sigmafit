
/**
 * Client
**/





/**
 * Model user
 * 
 */
export type user = {
  id: string
  first_name: string
  last_name: string
  email: string
  hashed_password: string
  is_banned: boolean
  created_time: Date
  last_token_generated_at: Date
}

/**
 * Model workout
 * 
 */
export type workout = {
  id: string
  name: string
  category: workout_type
  target_body_part: body_part | null
  intensity: intensity_levels | null
  owner_id: string
  is_public: boolean
}

/**
 * Model session_schema
 * 
 */
export type session_schema = {
  id: string
  name: string
  owner_id: string
}

/**
 * Model workout_schema
 * 
 */
export type workout_schema = {
  id: string
  session_schema_id: string
  workout_id: string
  default_target: any
  order: number
}

/**
 * Model superset_schema
 * 
 */
export type superset_schema = {
  id: string
  name: string
  session_schema_id: string
}

/**
 * Model superset_workout_schema
 * 
 */
export type superset_workout_schema = {
  id: string
  superset_schema_id: string
  workout_id: string
  default_target: any
  order: number
}

/**
 * Model session_instance
 * 
 */
export type session_instance = {
  id: string
  session_schema_id: string
  start_timestamp: Date
  end_timestamp: Date | null
}

/**
 * Model workout_instance
 * 
 */
export type workout_instance = {
  workout_schema_id: string
  session_instance_id: string
  sets_data: any
}

/**
 * Model superset_workout_instance
 * 
 */
export type superset_workout_instance = {
  superset_workout_schema_id: string
  session_instance_id: string
  sets_data: any
}


/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export let workout_type: {
  WEIGHT_AND_REPS: 'WEIGHT_AND_REPS',
  REPS: 'REPS',
  DISTANCE_AND_DURATION: 'DISTANCE_AND_DURATION',
  DURATION: 'DURATION'
};

export type workout_type = (typeof workout_type)[keyof typeof workout_type]


export let body_part: {
  LEGS: 'LEGS',
  SHOULDER: 'SHOULDER',
  INNER_CHEST: 'INNER_CHEST',
  OUTER_CHEST: 'OUTER_CHEST',
  ABS: 'ABS'
};

export type body_part = (typeof body_part)[keyof typeof body_part]


export let intensity_levels: {
  VERY_HARD: 'VERY_HARD',
  HARD: 'HARD',
  MEDIUM: 'MEDIUM',
  EASY: 'EASY',
  WARMUP: 'WARMUP'
};

export type intensity_levels = (typeof intensity_levels)[keyof typeof intensity_levels]
