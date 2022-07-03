import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { signUpUserMutation } from "../../api";
import { ErrorMessageAlertBox } from "../../components/ErrorMessageAlertBox";
import { MetaHead } from "../../components/Head";
import { Navbar } from "../../components/Navbar";


const initialValues: {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    password_confirm: string,
} = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirm: "",
}


const SignUp = () => {
    const { isLoading: waitingForServerResponse, mutate, error, data } = useMutation(signUpUserMutation)
    const router = useRouter()

    const handleSubmit = (values: any) => {
        mutate(values, {
            onSettled(data, error, variables, context) {
                if (data?.error) {
                    toast(data.message, {
                        type: 'error'
                    })
                } else {
                    toast('Registered successfully.', {
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
                            <h1>SignUp</h1>
                        </div>

                        <label className="mb-4 input-group w-full flex flex-col">
                            <div className="label">
                                First Name
                            </div>
                            <Field
                                name="first_name"
                                type="text"
                                id="first_name"
                                autoComplete="off"
                                placeholder="Steve"
                                className="input input-bordered input-primary  w-full "
                            />
                            <p className="text-red-500 text-xs mt-1">
                                <ErrorMessage name="first_name" />
                            </p>
                        </label>

                        <div className="mb-4 input-group w-full flex flex-col">
                            <label className="label" htmlFor="last_name">
                                Last Name
                            </label>
                            <Field
                                name="last_name"
                                type="text"
                                id="last_name"
                                autoComplete="off"
                                placeholder="Kurt"
                                className="input input-bordered input-primary  w-full "
                            />
                            <p className="text-red-500 text-xs mt-1">
                                <ErrorMessage name="last_name" />
                            </p>
                        </div>

                        <label className="mb-4 input-group w-full flex flex-col">
                            <div className="label" >
                                Email Address
                            </div>
                            <Field
                                name="email"
                                type="email"
                                id="email"
                                autoComplete="off"
                                placeholder="steve@mail.com"
                                className="input input-bordered input-primary  w-full "
                            />
                            <p className="text-red-500 text-xs mt-1">
                                <ErrorMessage name="email" />
                            </p>
                        </label>

                        <label className="mb-4 input-group w-full flex flex-col">
                            <div className="label">
                                Password
                            </div>
                            <Field
                                name="password"
                                type="password"
                                id="password"
                                autoComplete="off"
                                placeholder="*******"
                                className="input input-bordered input-primary  w-full "
                            />
                            <p className="text-red-500 text-xs mt-1">
                                <ErrorMessage name="password" />
                            </p>
                        </label>

                        <label className="mb-4 input-group w-full flex flex-col">
                            <div className="label">
                                Password Confirm
                            </div>
                            <Field
                                name="password_confirm"
                                type="password"
                                id="password_confirm"
                                autoComplete="off"
                                placeholder="*******"
                                className="input input-bordered input-primary  w-full "
                            />
                            <p className="text-red-500 text-xs mt-1">
                                <ErrorMessage name="password_confirm" />
                            </p>
                        </label>

                        <div className="flex items-center justify-between">
                            <button

                                className="btn"
                                type="submit"
                                disabled={waitingForServerResponse}
                            >
                                Join SigmaFit

                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}


export default SignUp;
