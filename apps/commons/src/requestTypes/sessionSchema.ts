export type create_session_schema__workout_schema = {
  workout_id: string;
  default_target: any;
  id: string;
  order: string | number;
};

export type create_session_schema__superset_schema = {
  name: string;
  superset_workout_schema: create_session_schema__workout_schema[];
  id: string;
  order: string | number;
};

export type SessionSchemaCreateRequest = {
  session_name: string;
  schema_blocks: (
    | create_session_schema__superset_schema
    | create_session_schema__workout_schema
  )[];
};

export type SessionSchemaVoteRequest = {
  schema_id: string;
  state: boolean;
};

export type SessionSchema_SubmitForReview_Request = {
  schema_id: string;
};

export type SessionSchema_Top_Request = {
  cursor_id: string | null;
};
