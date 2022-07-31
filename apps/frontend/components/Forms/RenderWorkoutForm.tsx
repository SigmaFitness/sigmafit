import { XIcon, InformationCircleIcon, SupportIcon } from "@heroicons/react/solid";
import { FormSingleSelectFormikField } from "../FormSingleSelectField";
import { FormSingleSelectFieldWithCreatable } from "../FormSingleSelectFieldWithCreatable";
import { MoveGrabberIcon } from "../icons/MoveGrabber";
import { MultiCreateInput } from "../MultiCreateInput";
import { BlockTools } from "./RenderSupersetBlockForm";
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
      <BlockTools  moveHandleClassName={moveHandleClassName} removeInstance={handleRemoveInstance} />

      <div className="flex-grow w-full">
        <div className="-mb-2">
          <div className="flex items-center">
            <FormSingleSelectFieldWithCreatable
              fieldId={`${uniqueIdPrefix}.workout_id`}
              fieldLabel="Workout Name"
              options={workoutOptions}
              setIsCreateNewWorkoutModalOpenAndPassInitValue={
                setIsCreateNewWorkoutModalOpenAndPassInitValue
              }
            />
          </div>
        </div>

        {workoutInstance ? (
          <>


            {/* DEFAULT TARGETS */}

            <MultiCreateInput
              targetEntity={targetEntity ?? "NONE"}
              fieldId={`${uniqueIdPrefix}.default_target`}
              isInline={false}
            />

            <div className="px-2 py-1 mb-1 text-gray-700">
              <div className="text-xs">
                <SupportIcon className="w-4 inline-block mr-1" />
                The selected workout is of
                <span className="font-semibold text-2xs px-1">
                  {workoutInstance.category}
                </span>
                category. Please enter the target
                <span className="font-semibold text-2xs px-1">
                  {targetEntity}
                </span>
                .
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};
