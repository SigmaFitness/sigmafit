import { workout_schema, superset_schema, session_schema, superset_workout_schema } from "../prismaGenTypes"


export type SessionSchemaDetailsResponse = {
    schema_blocks: (workout_schema | superset_schema & {
        superset_workout_schema: superset_workout_schema[];
    })[]
    session_name: string
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

export {}
