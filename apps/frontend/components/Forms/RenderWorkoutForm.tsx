import { XIcon, InformationCircleIcon } from "@heroicons/react/solid";
import { FormSingleSelectFormikField } from "../FormSingleSelectField";
import { FormSingleSelectFieldWithCreatable } from "../FormSingleSelectFieldWithCreatable";
import { MoveGrabberIcon } from "../icons/MoveGrabber";
import { MultiCreateInput } from "../MultiCreateInput";
import {
  create_session_schema__workout_schema__without_order,
  workout_category,
} from "./SessionSchemaForm";

const workoutCategoryToValNeeded = (category: workout_category) => {
  if (category === "DISTANCE_AND_DURATION" || category === "DURATION")
    return "Duration (in minutes)";
  else return "Reps";
};

export const RenderWorkoutForm = ({
  setIsCreateNewWorkoutModalOpenAndPassInitValue,
  handleRemoveInstance,
  moveHandleClassName,
  uniqueIdPrefix,
  workoutInstance,
  workoutOptions,
  containerStyles,
}: {
  handleRemoveInstance: () => void;
  workoutInstance: {
    id: string;
    category: workout_category;
  };
  workoutOptions: any;
  workoutSchemaInstance: create_session_schema__workout_schema__without_order;
  uniqueIdPrefix: string;
  containerStyles?: string;
  moveHandleClassName: string;
  setIsCreateNewWorkoutModalOpenAndPassInitValue: ({
    state,
    initialValue,
  }: {
    state: boolean;
    initialValue: string;
  }) => void;
}) => {
  const targetEntity = workoutInstance
    ? workoutCategoryToValNeeded(workoutInstance.category)
    : null;

  return (
    <div
      className={
        "flex flex-col justify-start items-center pt-0 " + containerStyles
      }
    >
      <div
        className={
          "cursor-move h-full w-full flex justify-center " + moveHandleClassName
        }
      >
        <MoveGrabberIcon className="w-4 text-gray-500" />
      </div>
      <div className="flex-grow  w-full">
        <div className="">
          <div className="flex items-center">
            <FormSingleSelectFieldWithCreatable
              fieldId={`${uniqueIdPrefix}.workout_id`}
              fieldLabel="Workout Name"
              options={workoutOptions}
              setIsCreateNewWorkoutModalOpenAndPassInitValue={
                setIsCreateNewWorkoutModalOpenAndPassInitValue
              }
            />
            <button
              className="ml-2  mt-3  btn-secondary btn btn-xs"
              type="button"
              onClick={handleRemoveInstance}
            >
              <XIcon className="w-4" />
            </button>
          </div>
        </div>

        {workoutInstance ? (
          <>
            <div className="border-black border px-2 py-1 mb-1">
              <div className="text-xs">
                <InformationCircleIcon className="w-4 inline-block mr-1" />
                The selected workout is of{" "}
                <span className="font-semibold text-2xs px-1">
                  {workoutInstance.category}
                </span>{" "}
                category. Please enter the default target{" "}
                <span className="font-semibold text-2xs px-1">
                  {targetEntity}
                </span>
                .
              </div>
            </div>

            {/* DEFAULT TARGETS */}

            <MultiCreateInput
              targetEntity={targetEntity ?? "NONE"}
              fieldId={`${uniqueIdPrefix}.default_target`}
              isInline={false}
            />
          </>
        ) : null}
      </div>
    </div>
  );
};
