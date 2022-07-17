import { WorkoutAddResponse, WorkoutFormOptionsResponse, WorkoutListResponse } from "@sigmafit/commons";
import { Formik, Form } from "formik";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { addNewWorkoutMutation, ErrorResponse, getNewWorkoutAddFormOptions } from "../api";
import { FormSingleSelectFormikField } from "./FormSingleSelectField";
import { FormInputField } from "./InputField";
import { SigmaModal } from "./SigmaModal";



const initialValues: {
    name: string,
    category: string,
    intensity: string,
    target_body_part: string
} = {
    name: "",
    category: "",
    intensity: "",
    target_body_part: ""
}



export const CreateNewWorkoutModal: React.FC<{
    isModalOpen: {
        state: boolean;
        initialValue: string;
    },
    setIsModalOpen: React.Dispatch<React.SetStateAction<{ state: boolean, initialValue: string }>>,
}> = ({ isModalOpen, setIsModalOpen }) => {

    const queryClient = useQueryClient()


    const { isLoading: waitingForServerResponse, mutate, error, data } = useMutation<WorkoutAddResponse, ErrorResponse>(addNewWorkoutMutation, {
        onSuccess: (data) => {
            const prevWorkouts = queryClient.getQueryData<WorkoutListResponse>('getAllWorkouts');

            queryClient.setQueryData('getAllWorkouts', {
                ...prevWorkouts, myWorkouts: [
                    ...(prevWorkouts?.myWorkouts ?? []), {
                        ...data
                    }

                ]
            })

            toast('Workout added successfully!', { type: 'success' })
            setIsModalOpen((e) => ({ ...e, state: false }))
        },
        onError: (err) => {
            toast(err.message, { type: 'error' })
        }
    })


    const { data: formOptions, isLoading: isFormOptionsLoading } = useQuery<WorkoutFormOptionsResponse, ErrorResponse>('getNewWorkoutAddFormOptions', getNewWorkoutAddFormOptions, {
        onSettled: (data, error) => {
            if (error) toast(error.message, { type: 'error' })
        }
    });

    const handleSubmit = async (values: any) => {
        mutate(values)
    }


    if (isModalOpen) {
        return (
            <>
                {isModalOpen ?
                    < SigmaModal
                        isOpen={isModalOpen.state}
                        setIsOpen={(newVal: boolean) => setIsModalOpen((e) => ({ ...e, state: newVal }))}
                    >

                        <div className="mt-16">

                            <Formik
                                initialValues={{ ...initialValues, name: isModalOpen.initialValue ?? '' }}
                                onSubmit={handleSubmit}
                            >
                                <Form className="text-black" autoComplete="off">

                                    <div className="prose text-center my-4">
                                        <h2>Add New Workout</h2>
                                    </div>


                                    <div className="alert alert-sm text-xs alert-warning my-2">
                                        We already have 100+ registered workouts, with detailed description, quick tips etc. Please ensure that there isn&apos;t an existing workout you&apos;re trying to add.
                                    </div>


                                    <FormInputField
                                        fieldId="name"
                                        fieldLabel="Name"
                                        placeholder="Lateral Raises"
                                    />

                                    <FormSingleSelectFormikField
                                        fieldId="category"
                                        fieldLabel="Category"
                                        options={(formOptions) ? formOptions.category.map((e: any) => ({ value: e, label: e })) : []}
                                    />

                                    <FormSingleSelectFormikField
                                        fieldId="target_body_part"
                                        fieldLabel="Target body part"
                                        options={(formOptions) ? formOptions.target_body_part.map((e: any) => ({ value: e, label: e })) : []}

                                    />

                                    <FormSingleSelectFormikField
                                        fieldId="intensity"
                                        fieldLabel="Intensity"
                                        options={(formOptions) ? formOptions.intensity.map((e: any) => ({ value: e, label: e })) : []}
                                    />



                                    <div className="flex items-center justify-between">
                                        <button
                                            className="btn"
                                            type="submit"
                                            disabled={waitingForServerResponse}
                                        >
                                            Submit

                                        </button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </SigmaModal> : null
                }
            </>
        )
    }
    return null;
}
