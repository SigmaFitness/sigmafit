import { workout_type } from "../prismaGenTypes";
import { SessionInstanceState_SetData } from "./sessionInstance";

export type Insights_Workout_Response = {
  workout_type: workout_type;
  dataPoints: {
    date: string;
    setValue: SessionInstanceState_SetData["values"][number];
    type: "DROPSET" | "NORMAL" | "SUPERSET";
  }[];
};

export type Insights_TimeSpent_Response = {
  dataPoints: {
    duration: number;
    startTime: Date; // it's date
    session_name: string;
  }[];
};
