import { useRouter } from "next/router"
import { useState } from "react"
import { useMutation, useQuery } from "react-query"
import { toast } from "react-toastify"
import { getSessionSchemaDetails } from "../../api"
import { MetaHead } from "../../components/Head"
import { Navbar } from "../../components/Navbar"
import SessionSchemaForm from "../../components/SessionSchemaForm"


// TODO: Currently we're using it as a way to show the data; editing is not allowed for now 
const sessionSchemaEdit = () => {

    const [initialValues, setInitialValues] = useState({
        session_name: '',
        workout_schema: [],
        superset_schema: []
    })


    const router = useRouter()

    const { id } = router.query







    const { isLoading } = useQuery(`getSessionSchemaDetails${id}`, () => getSessionSchemaDetails(id as string), {
        enabled: !!id,
        onSettled: (data) => {
            if (data?.error) {
                toast(data.message, { type: 'error' })
            } else if (data) {
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

export default sessionSchemaEdit
