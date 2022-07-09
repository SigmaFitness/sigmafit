import { Formik, Form } from "formik";
import router from "next/router";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { addNewWorkoutMutation, ErrorResponse, getNewWorkoutAddFormOptions } from "../api";
import { FormSingleSelectField } from "./FormSingleSelectField";
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
    isModalOpen: boolean,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    initialValue?: string
}> = ({ isModalOpen, setIsModalOpen, initialValue }) => {

    const queryClient = useQueryClient()


    const { isLoading: waitingForServerResponse, mutate, error, data } = useMutation<any, ErrorResponse>(addNewWorkoutMutation, {
        onSuccess: () => {
            const prevWorkouts=queryClient.getQueryData('getAllWorkouts');

            console.log(prevWorkouts)
            // queryClient.setQueryData('getAllWorkouts', {})
        }
    })


    const { data: formOptions, isLoading: isFormOptionsLoading } = useQuery<any, ErrorResponse>('getNewWorkoutAddFormOptions', getNewWorkoutAddFormOptions, {
        onSettled: (data, error) => {
            if (error) toast(error.message, { type: 'error' })
        }
    });

    const handleSubmit = async (values: any) => {
        console.log(values)

    mutate(values)

        // TODO: refetch

        // mutate(values, {
        //     onSettled(data, error, variables, context) {
        //         if (error) {
        //             toast(error.message, {
        //                 type: 'error'
        //             })
        //         } else {
        //             toast('Workout added successfully.', {
        //                 type: 'success'
        //             })
        //             router.push('/workout')
        //         }
        //     },
        // })
    }


    if (isModalOpen) {
        return (
            <>
                {isModalOpen ?
                    < SigmaModal
                        isOpen={isModalOpen}
                        setIsOpen={setIsModalOpen}
                    >



                        <div className="mt-16">

                            <Formik
                                initialValues={{ ...initialValues, name: initialValue??'' }}
                                onSubmit={handleSubmit}
                            >
                                <Form className="text-black" autoComplete="off">

                                    <div className="prose text-center my-4">
                                        <h2>Add New Workout</h2>
                                    </div>


                                    <div className="alert alert-sm text-sm alert-warning my-2">
                                        Please ensure that there isn't an existing workout.
                                    </div>


                                    <FormInputField
                                        fieldId="name"
                                        fieldLabel="Name"
                                        placeholder="Lateral Raises"
                                    />

                                    <FormSingleSelectField
                                        fieldId="category"
                                        fieldLabel="Category"
                                        options={(formOptions && !formOptions.error) ? formOptions.category.map((e: any) => ({ value: e, label: e })) : []}
                                    />

                                    <FormSingleSelectField
                                        fieldId="target_body_part"
                                        fieldLabel="Target body part"
                                        options={(formOptions && !formOptions.error) ? formOptions.target_body_part.map((e: any) => ({ value: e, label: e })) : []}

                                    />

                                    <FormSingleSelectField
                                        fieldId="intensity"
                                        fieldLabel="Intensity"
                                        options={(formOptions && !formOptions.error) ? formOptions.intensity.map((e: any) => ({ value: e, label: e })) : []}
                                    />



                                    <div className="flex items-center justify-between">
                                        <button

                                            className="btn"
                                            type="submit"
                                        // disabled={waitingForServerResponse}
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
