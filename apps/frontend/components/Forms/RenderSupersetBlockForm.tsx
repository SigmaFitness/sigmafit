import { XIcon } from "@heroicons/react/solid";
import { useFormikContext, FieldArray } from "formik";
import { ReactSortable } from "react-sortablejs";
import { MoveGrabberIcon } from "../icons/MoveGrabber";
import { FormInputField } from "../InputField";
import { create_session_schema__superset_schema__without_order, workout_category, workout_option } from "./SessionSchemaForm";
import { RenderWorkoutForm } from "./RenderWorkoutForm";



export const RenderSupersetBlockForm = ({ fieldPrefix, superset_schema_instance, workoutOptions, workoutIdToDataMap, removeInstance, setIsCreateNewWorkoutModalOpenAndPassInitValue }: {
    fieldPrefix: string,
    setsArrayHelpers: any, // TODO
    superset_schema_instance: create_session_schema__superset_schema__without_order,
    workoutOptions: workout_option[],
    workoutIdToDataMap: {
        [K: string]: {
            id: string,
            category: workout_category,
        }
    },
    removeInstance: any // TODO
    setIsCreateNewWorkoutModalOpenAndPassInitValue: React.Dispatch<React.SetStateAction<{ state: boolean, initialValue: string }>>
}) => {

    const { setFieldValue } = useFormikContext();
    return (
        <div className='border border-black mb-2 p-2 shadow-lg bg-base-200 pt-0 flex flex-col justify-center'>
            <div className="move-handle cursor-move h-full w-full flex justify-center">
                <MoveGrabberIcon className='w-4 text-gray-500' />
            </div>
            <>


                <div className="flex items-center gap-2">

                    <FormInputField
                        fieldId={`${fieldPrefix}.name`}
                        fieldLabel="Superset Name"
                        placeholder="BICEPS &amp; TRICEPS"
                    />
                    <button type="button" className="ml-2  mt-3  btn-secondary btn btn-xs" onClick={removeInstance}>
                        <XIcon className="w-4" />
                    </button>
                </div>

                <FieldArray
                    name={`${fieldPrefix}.superset_workout_schema`}
                    render={supersetWorkoutSchemaArrayHelpers => (
                        <div>
                            <ReactSortable list={superset_schema_instance.superset_workout_schema} setList={(newList) => {
                                setFieldValue(`${fieldPrefix}.superset_workout_schema`, newList)
                            }}
                                handle='.move-handle2'
                            >

                                {superset_schema_instance.superset_workout_schema && superset_schema_instance.superset_workout_schema.map((workoutSchemaInstance: any, workoutId: number) => {
                                    const workoutInstance = workoutIdToDataMap[workoutSchemaInstance.workout_id];

                                    return (
                                        <div className="" key={workoutId}>
                                            <RenderWorkoutForm
                                                moveHandleClassName='move-handle2'
                                                containerStyles="pt-0 ml-6 px-2 border bg-blue-300 border-black mb-2"
                                                handleRemoveInstance={() => {
                                                    supersetWorkoutSchemaArrayHelpers.remove(workoutId)
                                                }}
                                                uniqueIdPrefix={`${fieldPrefix}.superset_workout_schema.${workoutId}`}
                                                workoutInstance={workoutInstance}

                                                workoutOptions={workoutOptions}
                                                workoutSchemaInstance={workoutSchemaInstance}
                                                setIsCreateNewWorkoutModalOpenAndPassInitValue={setIsCreateNewWorkoutModalOpenAndPassInitValue}
                                            />
                                        </div>
                                    )
                                })}

                            </ReactSortable>
                            <div onClick={() => {
                                supersetWorkoutSchemaArrayHelpers.push(
                                    { workout_id: '', default_target: [], }
                                )
                            }} className="btn btn-xs mb-3">Add workout to superset</div>
                        </div>)} />


            </>

        </div>)
}
