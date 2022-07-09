import { FieldArray, Form, Formik } from "formik";
import { useState } from "react";
import { useQuery } from "react-query";
import { ReactSortable } from "react-sortablejs";
import { toast } from "react-toastify";
import { ErrorResponse, getAllWorkouts } from "../../api";
import { CreateNewWorkoutModal } from "../CreateNewWorkoutModal";
import { FormInputField } from "../InputField";
import { RenderSupersetBlockForm } from "./RenderSupersetBlockForm";
import { RenderWorkoutForm } from "./RenderWorkoutForm";



export type workout_option = { label: string, value: string }

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

    useQuery('getAllWorkouts', getAllWorkouts, {
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

    const [isCreateNewWorkoutModalOpen, setIsCreateNewWorkoutModalOpen] = useState(false)



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
                                                                setIsCreateNewWorkoutModalOpen={setIsCreateNewWorkoutModalOpen}
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
                                                            setIsCreateNewWorkoutModalOpen={setIsCreateNewWorkoutModalOpen}
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

            {isCreateNewWorkoutModalOpen ?
                <CreateNewWorkoutModal
                    isModalOpen={isCreateNewWorkoutModalOpen}
                    setIsModalOpen={setIsCreateNewWorkoutModalOpen}
                />
                : null
            }
        </div>

    )
}






export default SessionSchemaForm;


