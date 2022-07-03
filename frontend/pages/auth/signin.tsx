import { ErrorMessage, Field, Form, Formik } from "formik"
import { useRouter } from "next/router"
import { useMutation } from "react-query"
import { toast } from "react-toastify"
import { signInUserMutation } from "../../api"
import { MetaHead } from "../../components/Head"
import { FormInputField } from "../../components/InputField"
import { Navbar } from "../../components/Navbar"





const initialValues: {
    email: string,
    password: string,
} = {
    email: "",
    password: "",
}



const SignIn = () => {
    const { isLoading: waitingForServerResponse, mutate, error, data } = useMutation(signInUserMutation)
    const router = useRouter()

    const handleSubmit = (values: any) => {
        mutate(values, {
            onSettled(data, error, variables, context) {
                if (data?.error) {
                    toast(data.message, {
                        type: 'error'
                    })
                } else {
                    toast('Logged in successfully.', {
                        type: 'success',
                        onClose: () => {
                            router.push('/dash')
                        }
                    })
                }
            },
        })
    }


    return (
        <div>
            <MetaHead />


            <Navbar />
            <div className="form-container mt-16">

                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    <Form className="text-black" autoComplete="off">

                        <div className="prose text-center my-4">
                            <h1>SignIn</h1>
                        </div>

                        <FormInputField
                            fieldId="email"
                            fieldLabel="Email Address"
                            placeholder="steve@mail.com"
                        />
                        <FormInputField
                            fieldId="password"
                            fieldLabel="Password"
                            placeholder="*******"
                            type="password"
                        />


                        <div className="flex items-center justify-between">
                            <button

                                className="btn"
                                type="submit"
                                disabled={waitingForServerResponse}
                            >
                                Login

                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}


export default SignIn;
