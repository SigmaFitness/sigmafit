import { XIcon } from "@heroicons/react/solid";
import { useFormikContext, FieldArray } from "formik";
import { ReactSortable } from "react-sortablejs";
import { MoveGrabberIcon } from "../icons/MoveGrabber";
import { FormInputField } from "../InputField";
import {
  create_session_schema__superset_schema__without_order,
  workout_category,
  workout_option,
} from "./SessionSchemaForm";
import { RenderWorkoutForm } from "./RenderWorkoutForm";

export const RenderSupersetBlockForm = ({
  fieldPrefix,
  superset_schema_instance,
  workoutOptions,
  workoutIdToDataMap,
  removeInstance,
  setIsCreateNewWorkoutModalOpenAndPassInitValue,
}: {
  fieldPrefix: string;
  setsArrayHelpers: any; // TODO
  superset_schema_instance: create_session_schema__superset_schema__without_order;
  workoutOptions: workout_option[];
  workoutIdToDataMap: {
    [K: string]: {
      id: string;
      category: workout_category;
    };
  };
  removeInstance: any; // TODO
  setIsCreateNewWorkoutModalOpenAndPassInitValue: ({
    state,
    initialValue,
  }: {
    state: boolean;
    initialValue: string;
  }) => void;
}) => {
  const { setFieldValue } = useFormikContext();
  return (
    <div className="border group border-gray-400 mb-2 p-2 shadow-lg bg-base-200 pt-0 flex flex-col justify-center">
      <BlockTools moveHandleClassName="move-handle" removeInstance={removeInstance} />
      <>
        <div className="flex items-center gap-2">
          <FormInputField
            fieldId={`${fieldPrefix}.name`}
            fieldLabel="Superset Name"
            placeholder="BICEPS &amp; TRICEPS"
          />

        </div>

        <FieldArray
          name={`${fieldPrefix}.superset_workout_schema`}
          render={(supersetWorkoutSchemaArrayHelpers) => (
            <div>
              <ReactSortable
                list={superset_schema_instance.superset_workout_schema}
                setList={(newList) => {
                  setFieldValue(
                    `${fieldPrefix}.superset_workout_schema`,
                    newList
                  );
                }}
                handle=".move-handle2"
              >
                {superset_schema_instance.superset_workout_schema &&
                  superset_schema_instance.superset_workout_schema.map(
                    (workoutSchemaInstance: any, workoutId: number) => {
                      const workoutInstance =
                        workoutIdToDataMap[workoutSchemaInstance.workout_id];

                      return (
                        <div className="" key={workoutId}>
                          <RenderWorkoutForm
                            moveHandleClassName="move-handle2"
                            containerStyles="pt-0 ml-6 px-2 border bg-blue-300 border-black mb-2"
                            handleRemoveInstance={() => {
                              supersetWorkoutSchemaArrayHelpers.remove(
                                workoutId
                              );
                            }}
                            uniqueIdPrefix={`${fieldPrefix}.superset_workout_schema.${workoutId}`}
                            workoutInstance={workoutInstance}
                            workoutOptions={workoutOptions}
                            workoutSchemaInstance={workoutSchemaInstance}
                            setIsCreateNewWorkoutModalOpenAndPassInitValue={
                              setIsCreateNewWorkoutModalOpenAndPassInitValue
                            }
                          />
                        </div>
                      );
                    }
                  )}
              </ReactSortable>
              <div
                onClick={() => {
                  supersetWorkoutSchemaArrayHelpers.push({
                    workout_id: "",
                    default_target: [],
                  });
                }}
                className="btn btn-xs mb-3"
              >
                Add workout to superset
              </div>
            </div>
          )}
        />
      </>
    </div>
  );



};


export const BlockTools = ({ moveHandleClassName, removeInstance }: { removeInstance: () => void, moveHandleClassName: string }) => {
  return <div className="flex w-full justify-end items-center mt-2 gap-2">
    <div className={"btn btn-xs text-2xs lowercase font-light shadow-lg text-xs cursor-move btn-info hover:btn-primary flex justify-center " + moveHandleClassName}>
      <MoveGrabberIcon className="w-3" /> <span>Drag</span> 
    </div>
    <button
      type="button"
      className="btn-secondary lowercase font-light items-center justify-center flex btn btn-xs"
      onClick={removeInstance}
    >
      <XIcon className="w-3" /> <span>remove</span>
    </button>
  </div>;
}
