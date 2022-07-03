import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { addNewSessionSchema } from "../../api";
import { MetaHead } from "../../components/Head";
import { Navbar } from "../../components/Navbar";
import SessionSchemaForm from "../../components/SessionSchemaForm";


const AddSessionSchema = () => {
    const initialValues = {
        session_name: '',
        workout_schema: [],
        superset_schema: []
    }

    const { isLoading: waitingForServerResponse, mutate, error, data } = useMutation(addNewSessionSchema)



    const router = useRouter()


    const handleSubmit = (values: any) => {
        mutate(values, {
            onSettled(data, error, variables, context) {
                if (data?.error) {
                    toast(data.message, {
                        type: 'error'
                    })
                } else {
                    toast('Session Schema added successfully.', {
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
            <SessionSchemaForm
                heading="Build New Session Schema"
                initialValues={initialValues}
                handleSubmit={handleSubmit}
                waitingForServerResponse={waitingForServerResponse}
            />

        </div>
    )
}


export default AddSessionSchema;
