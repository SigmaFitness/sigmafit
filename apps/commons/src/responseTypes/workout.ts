import { body_part, intensity_levels, workout, workout_type } from "../prismaGenTypes"



export type WorkoutListResponse = {
    publicWorkouts: workout[],
    myWorkouts: workout[]
}


export type WorkoutAddResponse = workout


export type WorkoutDeleteResponse = {
    message: string
}


export type WorkoutFormOptionsResponse = {
    category: (keyof typeof workout_type)[],
    target_body_part: (keyof typeof body_part)[],
    intensity: (keyof typeof intensity_levels)[],
}

