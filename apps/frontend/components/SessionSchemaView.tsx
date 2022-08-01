import { useMutation } from "react-query";
import { changeStateOfSessionSchema } from "../api";
import { SessionSchemaFormValueType } from "./Forms/SessionSchemaForm";
import { SessionSchemaDetailsResponse } from "@sigmafit/commons";
import { DuplicateIcon, PencilAltIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { DescriptionText, RenderWorkoutView } from "./RenderWorkoutView";

export const SessionSchemaView = ({
  initialValues,
  handleSubmit,
  waitingForServerResponse,
  heading,
  sessionSchemaId,
}: {
  initialValues: SessionSchemaDetailsResponse;
  handleSubmit: (payload: SessionSchemaFormValueType) => void;
  waitingForServerResponse: boolean;
  heading: string;
  sessionSchemaId: string;
}) => {
  const { mutateAsync } = useMutation(
    "changeStateOfSessionSchema",
    changeStateOfSessionSchema
  );
  return (
    <div className="form-container prose">
      <div className="flex justify-between items-center mb-4">
        <h2 className="my-4">Workout Routine</h2>

        {/* If public then show a btn to clone */}
        {initialValues.state === "PRIVATE" ? (
          <Link href={`/sessionSchema/${sessionSchemaId}/edit`}>
            <div className="btn btn-xs">
              <PencilAltIcon className="w-5" />
              Edit
            </div>
          </Link>
        ) : initialValues.state === "PUBLIC" ? (
          <Link href={`/sessionSchema/${initialValues.id}/clone`}>
            <button className="btn btn-xs">
              <DuplicateIcon className="w-5" />
              Clone
            </button>
          </Link>
        ) : null}
        {/* If pvt then show a btn to  edit */}

        {/* If in review then show a in review btn */}
      </div>

      {/* print schema name */}

      <div>
        <DescriptionText
          name="Name:"
          value={initialValues.session_name}
          size="med"
        />
        <DescriptionText
          name="number of superset workouts:"
          value={initialValues.number_of_superset_workouts}
          size="med"
        />
        <DescriptionText
          name="number of workouts:"
          value={initialValues.number_of_workouts}
          size="med"
        />
        <DescriptionText
          name="number of workouts in superset:"
          value={initialValues.number_of_workouts_in_superset}
          size="med"
        />
        <DescriptionText
          name="state:"
          value={
            <div className="badge text-sm badge-warning">
              {initialValues.state}
            </div>
          }
          size="med"
        />
        {initialValues.state === "PUBLIC" ? (
          <DescriptionText
            name="Liked By:"
            value={initialValues.votes_count}
            size="med"
          />
        ) : null}
      </div>

      {initialValues.state === "PRIVATE" ? (
        <label className="label cursor-pointer -ml-1 my-0">
          <span className="label-text text-gray-500 text-xs uppercase font-bold">
            Make this workout routine public
          </span>
          <input
            type="checkbox"
            className="toggle toggle-md toggle-secondary"
            checked={initialValues.state !== "PRIVATE"}
            onChange={(e) => {
              if (
                confirm(
                  `Are you sure you want to make this workout routine public? You will lose the access to edit this workout routine! The review might take some time, and we'll send you an email once it's approved.`
                )
              ) {
                mutateAsync({
                  schema_id: initialValues.id,
                });
              }
            }}
          />
        </label>
      ) : null}

      <div className="divider"></div>
      {/* Print all workout blocks */}
      {initialValues.schema_blocks.map((e, indx) => {
        return (
          <div key={indx}>
            {"workout_id" in e ? (
              // workout instance
              <RenderWorkoutView
                target={e.default_target}
                workoutName={e.workout.name}
              />
            ) : (
              // superset schema instance
              <div className="my-2">
                <DescriptionText name={"Superset Name:"} value={e.name} />

                <div className="ml-2">
                  {e.superset_workout_schema.map((f, index) => (
                    <RenderWorkoutView
                      key={index}
                      target={f.default_target}
                      workoutName={f.workout.name}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
