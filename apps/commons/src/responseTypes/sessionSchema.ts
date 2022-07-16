import { workout_schema, superset_schema, session_schema, superset_workout_schema, session_schema_vote_by_user, schema_state } from "../prismaGenTypes"


export type SessionSchemaDetailsResponse = {
    schema_blocks: (
        (workout_schema & {
            workout: {
                name: string;
            }
        }) | superset_schema & {
            superset_workout_schema: (superset_workout_schema & {
                workout: {
                    name: string;
                }
            })[];
        })[],
    id: string
    session_name: string,
    state: schema_state
    votes_count: number;
    number_of_workouts: number;
    number_of_superset_workouts: number;
    number_of_workouts_in_superset: number;
}




export type SessionSchemaCreateResponse = {
    session_schema: session_schema;
    blocks: (workout_schema | superset_schema & {
        superset_workout_schema: superset_workout_schema[];
    })[];
}

export type SessionSchemaDeleteResponse = {
    message: string
}


export type SessionSchemaAllResponse = {
    id: string;
    name: string;
    last_attempted_at: Date;
    end_timestamp: Date | null
}[]



export type SessionSchema_Top_Response = {
    next_cursor: string | null,
    results: {
        id: string;
        name: string;
        votes_count: number;
        session_schema_vote_by_user: session_schema_vote_by_user[];
        number_of_workouts: number;
        number_of_superset_workouts: number;
        number_of_workouts_in_superset: number;
        owner: {
            first_name: string;
        };
    }[]
}



export type SessionSchemaVoteResponse = session_schema_vote_by_user | null


export type SessionSchema_SubmitForReview_Response = {
    message: string
}
