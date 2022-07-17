import * as yup from "yup";

export const workoutInsightsPayloadValidator = yup.object().shape({
  workout_id: yup.string().uuid().required(),
  timeFrame: yup.mixed().oneOf(["max", "last_month"]).required(),
});
