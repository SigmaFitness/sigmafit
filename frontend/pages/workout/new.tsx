import { ErrorMessage, Field, Form, Formik } from "formik"
import { useRouter } from "next/router"
import { useMutation, useQuery } from "react-query"
import { toast } from "react-toastify"
import { string } from "yup"
import { addNewWorkoutMutation, ErrorResponse, getNewWorkoutAddFormOptions } from "../../api"
import { FormSingleSelectField } from "../../components/FormSingleSelectField"
import { MetaHead } from "../../components/Head"
import { FormInputField } from "../../components/InputField"
import { Navbar } from "../../components/Navbar"





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



const AddNewWorkout = () => {
    const { isLoading: waitingForServerResponse, mutate, error, data } = useMutation<any,ErrorResponse>(addNewWorkoutMutation)
    const router = useRouter()


    const { data: formOptions, isLoading: isFormOptionsLoading } = useQuery<any,ErrorResponse>('getNewWorkoutAddFormOptions', getNewWorkoutAddFormOptions, {
        onSettled: (data, error) => {
            if (error) toast(error.message, { type: 'error' })
        }
    });

    const handleSubmit = (values: any) => {
        mutate(values, {
            onSettled(data, error, variables, context) {
                if (error) {
                    toast(error.message, {
                        type: 'error'
                    })
                } else {
                    toast('Workout added successfully.', {
                        type: 'success'
                    })
                    router.push('/workout')
                }
            },
        })
    }


    return (
        <div>
            <MetaHead />


            <Navbar />
            <div className="px-4">
                <div className="form-container mt-16">

                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                    >
                        <Form className="text-black" autoComplete="off">

                            <div className="prose text-center my-4">
                                <h1>Add New Workout</h1>
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
                                    disabled={waitingForServerResponse}
                                >
                                    Submit

                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    )
}


export default AddNewWorkout;
