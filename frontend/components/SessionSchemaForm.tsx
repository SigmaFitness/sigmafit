import { InformationCircleIcon, XIcon } from "@heroicons/react/solid";
import { FieldArray, Form, Formik } from "formik";
import { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { getAllWorkouts } from "../api";
import { FormSingleSelectField as FormSingleSelectField } from "../components/FormSingleSelectField";
import { FormInputField } from "../components/InputField";
import { MultiCreateInput } from "./MultiCreateInput";


const workoutCategoryToValNeeded = (category: workout_category) => {
    if (category === 'DISTANCE_AND_DURATION' || category === 'DURATION') return 'Duration (in minutes)'
    else return 'Reps'
}



export type workout_category =
    | 'WEIGHT_AND_REPS'
    | 'REPS'
    | 'DISTANCE_AND_DURATION'
    | 'DURATION'

const SessionSchemaForm = ({ initialValues, handleSubmit, waitingForServerResponse, heading }: {
    initialValues: {
        session_name: string,
        // NOTE: workoutName isn't required at server end. It's only for displaying the results on UI
        workout_schema: { workout_id: string, default_target: number[] }[],
        superset_schema: { workout_id: string, default_target: number[] }[][]
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

    const [workoutOptions, setWorkouts] = useState<{ label: string, value: string }[]>([]);

    useQuery('workouts', getAllWorkouts, {
        onSettled: (data) => {
            if (data?.error) toast(data.message, { type: 'error' })
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
                render={({ values }) => (
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
                            <h3>Workouts</h3>

                            <FieldArray
                                name="workout_schema"
                                render={setsArrayHelpers => (
                                    <>

                                        {values.workout_schema ? values.workout_schema.map((workoutSchemaInstance, workoutIndx) => {
                                            const workoutInstance = workoutIdToDataMap[workoutSchemaInstance.workout_id];

                                            return (
                                                <div className="border border-black mb-2 p-2 shadow-lg bg-base-200" key={workoutIndx}>
                                                    <RenderWorkoutForm
                                                        handleRemoveInstance={() =>
                                                            setsArrayHelpers.remove(workoutIndx)
                                                        }
                                                        uniqueIdPrefix={`workout_schema.${workoutIndx}`}
                                                        workoutInstance={workoutInstance}
                                                        key={workoutIndx}
                                                        workoutOptions={workoutOptions}
                                                        workoutSchemaInstance={workoutSchemaInstance}
                                                    />
                                                </div>
                                            )
                                        }) : null}

                                        <div className='text-sm items-center justify-center'>

                                            <div onClick={() => {
                                                setsArrayHelpers.push({ workout_id: '', default_target: [] })
                                            }} className="btn btn-sm">Add another workout</div>


                                        </div>


                                    </>
                                )} />
                        </div>


                        <div>
                            <h3>Supersets</h3>

                            <FieldArray
                                name="superset_schema"
                                render={setsArrayHelpers => (
                                    <>

                                        {values.superset_schema ?

                                            values.superset_schema.map((superset_schema_instance, superset_schema_indx) => {
                                                return (

                                                    <div key={'superset_schema_indx' + superset_schema_indx} className='border border-black mb-2 p-2 shadow-lg bg-base-200'>
                                                        <div className="flex items-center gap-2">

                                                            <FormInputField
                                                                fieldId={`superset_schema.${superset_schema_indx}.name`}
                                                                fieldLabel="Superset Name"
                                                                placeholder="BICEPS &amp; TRICEPS"
                                                            />
                                                            <button type="button" className="ml-2  mt-3  btn-secondary btn btn-xs" onClick={() => setsArrayHelpers.remove(superset_schema_indx)}>
                                                                <XIcon className="w-4" />
                                                            </button>
                                                        </div>

                                                        <FieldArray
                                                            name={`superset_schema.${superset_schema_indx}.superset_workout_schema`}
                                                            render={supersetWorkoutSchemaArrayHelpers => (
                                                                <>

                                                                    {(superset_schema_instance as any).superset_workout_schema ? (superset_schema_instance as any).superset_workout_schema.map((workoutSchemaInstance: any, workoutIndx: number) => {
                                                                        const workoutInstance = workoutIdToDataMap[workoutSchemaInstance.workout_id];

                                                                        return (
                                                                            <div className="pl-6 mb-2" key={workoutIndx}>
                                                                                <RenderWorkoutForm
                                                                                    handleRemoveInstance={() => {
                                                                                        supersetWorkoutSchemaArrayHelpers.remove(workoutIndx)
                                                                                    }}
                                                                                    uniqueIdPrefix={`superset_schema.${superset_schema_indx}.superset_workout_schema.${workoutIndx}`}
                                                                                    workoutInstance={workoutInstance}

                                                                                    workoutOptions={workoutOptions}
                                                                                    workoutSchemaInstance={workoutSchemaInstance}
                                                                                />
                                                                            </div>
                                                                        )
                                                                    }) : null}


                                                                    <div onClick={() => {
                                                                        supersetWorkoutSchemaArrayHelpers.push(
                                                                            { workout_id: '', default_target: [] }
                                                                        )
                                                                    }} className="btn btn-xs mb-3">Add workout to superset</div>


                                                                </>)} />
                                                    </div>)
                                            })

                                            : null}


                                        <div className='text-sm items-center justify-center'>

                                            <div onClick={() => {
                                                setsArrayHelpers.push({
                                                    name: '',
                                                    superset_workout_schema: []
                                                })
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



const RenderWorkoutForm = ({ handleRemoveInstance, uniqueIdPrefix, workoutInstance, workoutOptions, workoutSchemaInstance }: {
    handleRemoveInstance: () => void,
    workoutInstance: any,
    workoutOptions: any,
    workoutSchemaInstance: any,
    uniqueIdPrefix: string
}) => {

    const targetEntity = workoutInstance ? workoutCategoryToValNeeded(workoutInstance.category) : null

    return (
        <div>

            <div>
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



                    {/* <FieldArray
                        name={`${uniqueIdPrefix}.default_target`}
                        render={setsArrayHelpersDefaultTargets => (
                            <>


                                {workoutSchemaInstance.default_target.map((e: any, default_target_indx: number) => {


                                    return (
                                        <FormInputField
                                            key={`${uniqueIdPrefix}.default_target.${default_target_indx}`}
                                            isInline={true}
                                            fieldLabel={((tmp as any).charAt(0).toUpperCase() + (tmp as any).substring(1).toLowerCase()) ?? 'ERR'}
                                            type='number'
                                            fieldId={`${uniqueIdPrefix}.default_target.${default_target_indx}`}
                                        />
                                    )
                                })}
                                <div className="flex justify-end mb-2">
                                    <div className="btn btn-info btn-xs" onClick={() => {
                                        setsArrayHelpersDefaultTargets.push(12)
                                    }}>
                                        <PlusIcon className="w-4 mr-1" />
                                        Add new set info
                                    </div>
                                </div>
                            </>)} /> */}

                </> : null}

        </div>
    )
}

export default SessionSchemaForm;


