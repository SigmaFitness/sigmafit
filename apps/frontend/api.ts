import axios from "axios";
import { useQuery } from "react-query";
import {
  Insights_Workout_Request,
  SessionSchemaVoteRequest,
  SessionSchema_SubmitForReview_Request,
  SessionSchema_Top_Request,
  WorkoutListResponse,
} from "@sigmafit/commons";
import { user } from "@sigmafit/commons/dist/prismaGenTypes";

const apiPrefixSlug = `/api`;

export type ErrorResponse = {
  error: true;
  message: string;
  status: number;
};

const makePostRequest = async <T>(
  url: string,
  method: "GET" | "POST",
  data?: any
): Promise<T> => {
  try {
    const response = await axios(url, {
      data,
      method,
      withCredentials: true,
    });
    return response.data;
  } catch (err: any) {
    throw {
      error: true,
      message: err.response.data.message ?? err.message,
      status: err.response.status,
    };
  }
};

// WORKOUT
export const getAllWorkouts = async () => {
  return makePostRequest<WorkoutListResponse>(
    `${apiPrefixSlug}/workout/list`,
    "GET"
  );
};

export const addNewOrModifyWorkoutMutation = async (workoutData: any) => {
  const newObj: any = {};
  Object.keys(workoutData).forEach((e) => {
    if (workoutData[e]) newObj[e] = workoutData[e];
  });
  return makePostRequest<any>(
    `${apiPrefixSlug}/workout/addOrModify`,
    "POST",
    newObj
  );
};

export const getNewWorkoutAddFormOptions = async () => {
  return makePostRequest<any>(`${apiPrefixSlug}/workout/formOptions`, "GET");
};

export const deleteWorkout = async (workout_id: string) => {
  return makePostRequest<any>(`${apiPrefixSlug}/workout/delete`, "POST", {
    id: workout_id,
  });
};

/**
 * Get all active sessions for the user
 */
export const getAllActiveSessions = async () => {
  return makePostRequest<any>(
    `${apiPrefixSlug}/sessionInstance/allActive`,
    "GET"
  );
};

/**
 * Get all schema owned by the user
 */
export const getAllSessionSchemaOwnedByUser = async () => {
  return makePostRequest<any>(`${apiPrefixSlug}/sessionSchema/all`, "GET");
};

/**
 * Start a new session from schema Id
 */
export const startANewSessionFromSchemaId = async (sessionSchemaId: string) => {
  return makePostRequest<any>(
    `${apiPrefixSlug}/sessionInstance/start`,
    "POST",
    {
      sessionSchemaId,
    }
  );
};

export const addNewSessionSchema = async (sessionSchema: any) => {
  return makePostRequest<any>(
    `${apiPrefixSlug}/sessionSchema/create`,
    "POST",
    sessionSchema
  );
};

export const getSessionSchemaDetails = async (schemaId: string) => {
  return makePostRequest<any>(
    `${apiPrefixSlug}/sessionSchema/details/${schemaId}`,
    "GET"
  );
};

export const getSessionInstanceDetails = async (schemaInstanceId: string) => {
  return makePostRequest<any>(
    `${apiPrefixSlug}/sessionInstance/state/${schemaInstanceId}`,
    "GET"
  );
};

export const getCurrentUser = async () => {
  return makePostRequest<any>(`${apiPrefixSlug}/auth/currentUser`, "GET");
};

export const useGetCurrentUserQuery = () =>
  useQuery<{ is_logged_in: true; user: user }, ErrorResponse>(
    "getCurrentUser",
    getCurrentUser,
    {
      retry: false,
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );

export const logOutUser = async () => {
  return makePostRequest<any>(`${apiPrefixSlug}/auth/logOut`, "GET");
};

export const sessionInstanceAddOrModifyBlock = async (payload: any) => {
  return makePostRequest<any>(
    `${apiPrefixSlug}/sessionInstance/addOrModifyBlock`,
    "POST",
    payload
  );
};

export const endSessionInstance = async (activeSessionInstanceId: any) => {
  return makePostRequest<any>(`${apiPrefixSlug}/sessionInstance/end`, "POST", {
    activeSessionInstanceId,
  });
};

export const changeStateOfSessionSchema = async (
  payload: SessionSchema_SubmitForReview_Request
) => {
  return makePostRequest<any>(
    `${apiPrefixSlug}/sessionSchema/submit_for_review`,
    "POST",
    payload
  );
};

export const getTopSessionSchema = async (
  pageState: SessionSchema_Top_Request
) => {
  return makePostRequest<any>(
    `${apiPrefixSlug}/sessionSchema/top`,
    "POST",
    pageState
  );
};

export const voteASessionSchema = async (payload: SessionSchemaVoteRequest) => {
  return makePostRequest<any>(
    `${apiPrefixSlug}/sessionSchema/vote/`,
    "POST",
    payload
  );
};

export const getWorkoutInsights = async (payload: Insights_Workout_Request) => {
  return makePostRequest<any>(
    `${apiPrefixSlug}/insights/workout`,
    "POST",
    payload
  );
};

export const getTimeSpentInsights = async () => {
  return makePostRequest<any>(`${apiPrefixSlug}/insights/timeSpent`, "POST");
};

export const getUserProfile = async () => {
  return makePostRequest<user>(`${apiPrefixSlug}/auth/profile`, "GET");
};
