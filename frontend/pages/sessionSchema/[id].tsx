import { useRouter } from "next/router"
import { useState } from "react"
import { useMutation, useQuery } from "react-query"
import { toast } from "react-toastify"
import { ErrorResponse, getSessionSchemaDetails } from "../../api"
import { MetaHead } from "../../components/Head"
import { Navbar } from "../../components/Navbar"
import SessionSchemaForm from "../../components/SessionSchemaForm"


// TODO: Currently we're using it as a way to show the data; editing is not allowed for now 
const SessionSchemaEdit = () => {

    const [initialValues, setInitialValues] = useState({
        session_name: '',
        schema_blocks: []
    })


    const router = useRouter()

    const { id } = router.query



    const { isLoading } = useQuery<any, ErrorResponse>(['getSessionSchemaDetails', id], () => getSessionSchemaDetails(id as string), {
        enabled: !!id,
        onSettled: (data, error) => {
            if (error) toast(error.message, { type: 'error' })
            else if (data) {
                setInitialValues(data.data)
            }
        }
    })



    const handleSubmit = (values: any) => {
        toast('Editing form is currently disabled..')
    }






    return (
        <div>
            <MetaHead />


            <Navbar />

            <div className="px-3 my-10">

                {isLoading ? <div className="alert alert-info max-w-2xl mx-auto">Loading...</div> :
                    <SessionSchemaForm
                        heading="Edit Session Schema"
                        initialValues={initialValues}
                        handleSubmit={handleSubmit}
                        waitingForServerResponse={false}
                    />}
            </div>
        </div>

    )
}

export default SessionSchemaEdit
