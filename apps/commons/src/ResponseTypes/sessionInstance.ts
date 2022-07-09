import { session_instance, superset_schema, superset_workout_instance, workout_instance, workout_type } from "../prismaGenTypes"


export type SessionInstanceStartResponse = session_instance


export type SessionInstanceSetData = {
    value: string,

}

export type SessionInstanceState_SetData = {
    values: Array<({
        weight: number,
        reps: number
    } | {
        reps: number
    } | {
        duration: number
        distance: number,
    } | {
        duration: number,
    })>
}
// TODO: Shall we add just DISTANCE?

export type SessionInstanceStateResponse = {
    superset_schema_details: Record<string, superset_schema>,
    session_workouts: {
        superset_or_classic_workout_schema_id: string,
        workout_id: string,
        default_target: (string | number)[],
        order: number,
        current_workout_instance_sets_data: SessionInstanceState_SetData[],
        prev_workout_instance_sets_data: SessionInstanceState_SetData[],
        type: 'CLASSIC_WORKOUT' | 'SUPERSET_WORKOUT',
        workout_category: keyof typeof workout_type,
        workout_name: string,
        superset_schema_name: string | null
    }[],
    session_instance_details: {
        schema_name: string,
        end_timestamp: Date,
        start_timestamp: Date,
    }
}

export type SessionInstanceAddOrModifyBlockResponse = workout_instance | superset_workout_instance

export type SessionInstanceAllActiveResponse = (session_instance & {
    session_schema: {
        name: string;
        owner_id: string;
    };
})[]

export type SessionInstanceEndResponse = {
    message: string
}

export {}
