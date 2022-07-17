import { create_session_schema__superset_schema, create_session_schema__workout_schema, WorkoutListResponse } from "@sigmafit/commons";
import { PrismaGenTypes } from "@sigmafit/commons";
import { FieldArray, Form, Formik } from "formik";
import { useState } from "react";
import { useQuery } from "react-query";
import { ReactSortable } from "react-sortablejs";
import { toast } from "react-toastify";
import { ErrorResponse, getAllWorkouts } from "../../api";
import { CreateNewOrEditWorkoutModal, defaultInitialValues_WorkoutForm } from "../CreateNewOrEditWorkoutModal";
import { FormInputField } from "../InputField";
import { RenderSupersetBlockForm } from "./RenderSupersetBlockForm";
import { RenderWorkoutForm } from "./RenderWorkoutForm";



export type workout_option = { label: string, value: string }

export type workout_category =
    | 'WEIGHT_AND_REPS'
    | 'REPS'
    | 'DISTANCE_AND_DURATION'
    | 'DURATION';


// IMP: Note that while editing we get an ID (uuid) from the server; but while adding blocks we just put Math.random() id; (This is to satisfy SortableJS)


export type create_session_schema__superset_schema__without_order = Omit<create_session_schema__superset_schema, "order">
export type create_session_schema__workout_schema__without_order = Omit<create_session_schema__workout_schema, "order">



export type SessionSchemaFormValueType = {
    session_name: string,
    schema_blocks: (create_session_schema__workout_schema__without_order | create_session_schema__superset_schema__without_order)[]
}

const SessionSchemaForm = ({ initialValues, handleSubmit, waitingForServerResponse, heading }: {
    initialValues: SessionSchemaFormValueType,
    handleSubmit: (payload: SessionSchemaFormValueType) => void;
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

    useQuery<WorkoutListResponse, ErrorResponse>('getAllWorkouts', getAllWorkouts, {
        onSettled: (data, error) => {
            if (error) toast(error.message, { type: 'error' })
            else if (data) {
                const obj: Record<string, PrismaGenTypes.workout> = {}

                setWorkouts(
                    [
                        ...data.publicWorkouts.map((e) => {
                            obj[e.id] = e
                            return { label: e.name, value: e.id }
                        }),
                        ...data.myWorkouts.map((e) => {
                            obj[e.id] = e
                            return { label: e.name, value: e.id }
                        })
                    ]
                )
                setWorkoutIdToDataMap(obj)
            }

        }
    });

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [initialWorkoutNameTypedValue, setInitialWorkoutNameTypedValue] = useState('')


    const setIsCreateNewWorkoutModalOpenAndPassInitValue = ({state, initialValue }: {state: boolean, initialValue: string}) => {
        setInitialWorkoutNameTypedValue(initialValue)
        setIsModalOpen(state)
    }

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

                                                if ('workout_id' in schemaBlock) {
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
                                                                setIsCreateNewWorkoutModalOpenAndPassInitValue={setIsCreateNewWorkoutModalOpenAndPassInitValue}
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
                                                            setIsCreateNewWorkoutModalOpenAndPassInitValue={setIsCreateNewWorkoutModalOpenAndPassInitValue}
                                                        />)
                                                }
                                            })}
                                        </ReactSortable>

                                        <div className='text-sm items-center gap-3 flex'>

                                            <div onClick={() => {
                                                const newWorkout: create_session_schema__workout_schema__without_order = { id: Math.random().toString(), workout_id: '', default_target: [] }
                                                setsArrayHelpers.push(newWorkout)
                                            }} className="btn btn-sm">Add another workout</div>



                                            <div onClick={() => {
                                                const newSupersetWorkout: create_session_schema__superset_schema__without_order = { id: Math.random().toString(), name: '', superset_workout_schema: [] }

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

            {isModalOpen ?
                <CreateNewOrEditWorkoutModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    initialValues={{
                        ...defaultInitialValues_WorkoutForm,
                        name: initialWorkoutNameTypedValue,
                    }}
                />
                : null
            }
        </div>

    )
}






export default SessionSchemaForm;


