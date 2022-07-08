import { InformationCircleIcon, XIcon } from "@heroicons/react/solid";
import { FieldArray, Form, Formik, useFormikContext } from "formik";
import { useState } from "react";
import { useQuery } from "react-query";
import { ItemInterface, ReactSortable } from "react-sortablejs";
import { toast } from "react-toastify";
import { ErrorResponse, getAllWorkouts } from "../api";
import { FormSingleSelectField as FormSingleSelectField } from "../components/FormSingleSelectField";
import { FormInputField } from "../components/InputField";
import { MoveGrabberIcon } from "./icons/MoveGrabber";
import { MultiCreateInput } from "./MultiCreateInput";


const workoutCategoryToValNeeded = (category: workout_category) => {
    if (category === 'DISTANCE_AND_DURATION' || category === 'DURATION') return 'Duration (in minutes)'
    else return 'Reps'
}



type workout_option = { label: string, value: string }

export type workout_category =
    | 'WEIGHT_AND_REPS'
    | 'REPS'
    | 'DISTANCE_AND_DURATION'
    | 'DURATION';


export type workout_schema_block = {
    workout_id: string,
    default_target: number[],
    type: 'workout_schema_block'
    id: number
}

export type superset_schema_block = {
    name: string,
    superset_workout_schema: workout_schema_block[],
    type: 'superset_schema_block'
    id: number
}

const SessionSchemaForm = ({ initialValues, handleSubmit, waitingForServerResponse, heading }: {
    initialValues: {
        session_name: string,
        schema_blocks: ((superset_schema_block | workout_schema_block))[]
    },
    handleSubmit: any;
    waitingForServerResponse: boolean,
    heading: string
}) => {



    const [workoutIdToDataMap, setWorkoutIdToDataMap] = useState<{
        [K: string]: {
            id: string,
            category: workout_category,
        }
    }>({});

    const [workoutOptions, setWorkouts] = useState<workout_option[]>([]);

    useQuery('workouts', getAllWorkouts, {
        onSettled: (data, error: ErrorResponse | null) => {
            if (error) toast(error.message, { type: 'error' })
            else if (data) {
                const obj: any = {}
                setWorkouts(
                    [
                        ...data.publicWorkouts.map((e: any) => {
                            obj[e.id] = e
                            return { label: e.name, value: e.id }
                        }),
                        ...data.myWorkouts.map((e: any) => {
                            obj[e.id] = e
                            return { label: e.name, value: e.id }
                        })
                    ]
                )
                setWorkoutIdToDataMap(obj)
            }

        }
    });

    return (

        <div className="form-container mt-16 prose px-4">

            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                render={({ values, setFieldValue }) => (
                    <Form className="text-black" autoComplete="off">

                        <div className="prose text-center my-4">
                            <h2>{heading}</h2>
                        </div>

                        <FormInputField
                            fieldId="session_name"
                            fieldLabel="Session Name"
                            placeholder="Strong Leg Day"
                        />



                        <div>

                            <FieldArray
                                name="schema_blocks"
                                render={setsArrayHelpers => (
                                    <>

                                        <ReactSortable list={values.schema_blocks} setList={(newList) => {
                                            setFieldValue('schema_blocks', newList)
                                        }}
                                            handle='.move-handle'
                                        >

                                            {values.schema_blocks.map((schemaBlock, schemaBlockIndex) => {

                                                if (schemaBlock.type === 'workout_schema_block') {
                                                    const workoutInstance = workoutIdToDataMap[schemaBlock.workout_id];
                                                    return (
                                                        <div key={schemaBlockIndex}>
                                                            <RenderWorkoutForm
                                                                handleRemoveInstance={() =>
                                                                    setsArrayHelpers.remove(schemaBlockIndex)
                                                                }
                                                                moveHandleClassName='move-handle'
                                                                containerStyles="border border-black mb-2 p-2 shadow-lg  bg-base-200"
                                                                uniqueIdPrefix={`schema_blocks.${schemaBlockIndex}`}
                                                                workoutInstance={workoutInstance}
                                                                workoutOptions={workoutOptions}
                                                                workoutSchemaInstance={schemaBlock}
                                                            />
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        <RenderSupersetBlockForm
                                                            key={schemaBlockIndex}
                                                            fieldPrefix={`schema_blocks.${schemaBlockIndex}`}
                                                            setsArrayHelpers={setsArrayHelpers}
                                                            superset_schema_instance={schemaBlock}
                                                            removeInstance={() => setsArrayHelpers.remove(schemaBlockIndex)}
                                                            workoutIdToDataMap={workoutIdToDataMap}
                                                            workoutOptions={workoutOptions}
                                                        />)
                                                }
                                            })}
                                        </ReactSortable>

                                        <div className='text-sm items-center gap-3 flex'>

                                            <div onClick={() => {
                                                const newWorkout: workout_schema_block = { id: Math.random() * 1000, workout_id: '', default_target: [], type: 'workout_schema_block' }
                                                setsArrayHelpers.push(newWorkout)
                                            }} className="btn btn-sm">Add another workout</div>



                                            <div onClick={() => {
                                                const newSupersetWorkout: superset_schema_block = { id: Math.random() * 1000, name: '', superset_workout_schema: [], type: 'superset_schema_block' }

                                                setsArrayHelpers.push(newSupersetWorkout)
                                            }} className="btn btn-sm">Add superset</div>


                                        </div>


                                    </>
                                )} />
                        </div>





                        <div className="flex items-center mt-5 justify-between">
                            <button

                                className="btn"
                                type="submit"
                                disabled={waitingForServerResponse}
                            >
                                Submit

                            </button>
                        </div>
                    </Form>
                )}
            />
        </div>

    )
}


const RenderSupersetBlockForm = ({ fieldPrefix, superset_schema_instance, workoutOptions, workoutIdToDataMap, removeInstance }: {
    fieldPrefix: string,
    setsArrayHelpers: any, // TODO
    superset_schema_instance: superset_schema_block,
    workoutOptions: workout_option[],
    workoutIdToDataMap: {
        [K: string]: {
            id: string,
            category: workout_category,
        }
    },
    removeInstance: any // TODO
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
                        <>
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
                        </>)} />


            </>

        </div>)
}



const RenderWorkoutForm = ({ handleRemoveInstance, moveHandleClassName, uniqueIdPrefix, workoutInstance, workoutOptions, containerStyles }: {
    handleRemoveInstance: () => void,
    workoutInstance: {
        id: string;
        category: workout_category;
    },
    workoutOptions: any,
    workoutSchemaInstance: workout_schema_block,
    uniqueIdPrefix: string,
    containerStyles?: string,
    moveHandleClassName: string
}) => {

    const targetEntity = workoutInstance ? workoutCategoryToValNeeded(workoutInstance.category) : null

    return (

        <div className={"flex flex-col justify-start items-center pt-0 " + containerStyles}>
            <div className={"cursor-move h-full w-full flex justify-center " + moveHandleClassName}>
                <MoveGrabberIcon className='w-4 text-gray-500' />
            </div>
            <div className="flex-grow  w-full">
                <div className="">
                    <div className="flex items-center">
                        <FormSingleSelectField
                            fieldId={`${uniqueIdPrefix}.workout_id`}
                            fieldLabel="Workout Name"
                            options={workoutOptions}
                        />
                        <button className="ml-2  mt-3  btn-secondary btn btn-xs" type="button" onClick={handleRemoveInstance}>
                            <XIcon className="w-4" />
                        </button>
                    </div>

                </div>

                {workoutInstance ?

                    <>

                        <div className="border-black border px-2 py-1 mb-1">

                            <div className="text-xs">
                                <InformationCircleIcon className="w-4 inline-block mr-1" />
                                The selected workout is of <span className="font-semibold text-2xs px-1">{workoutInstance.category}</span> category. Please enter the default target <span className="font-semibold text-2xs px-1">{targetEntity}</span>.
                            </div>
                        </div>


                        {/* DEFAULT TARGETS */}


                        <MultiCreateInput
                            targetEntity={targetEntity ?? 'NONE'}
                            fieldId={`${uniqueIdPrefix}.default_target`}
                            isInline={false}
                        />

                    </> : null}

            </div>

        </div>
    )
}

export default SessionSchemaForm;


