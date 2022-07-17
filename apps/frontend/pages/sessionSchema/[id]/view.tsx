import { useRouter } from "next/router"
import { useState } from "react"
import { useMutation, useQuery } from "react-query"
import { toast } from "react-toastify"
import { changeStateOfSessionSchema, ErrorResponse, getSessionSchemaDetails } from "../../../api"
import { MetaHead } from "../../../components/Head"
import { Navbar } from "../../../components/Navbar"
import SessionSchemaForm, { SessionSchemaFormValueType } from "../../../components/Forms/SessionSchemaForm"
import { SessionSchemaDetailsResponse } from "@sigmafit/commons"
import { DuplicateIcon, PencilAltIcon } from "@heroicons/react/solid"
import Link from "next/link"


// TODO: Currently we're using it as a way to show the data; editing is not allowed for now 
const SessionSchemaEdit = () => {

    const router = useRouter()

    const { id } = router.query



    const { isLoading, data } = useQuery<SessionSchemaDetailsResponse, ErrorResponse>(['getSessionSchemaDetails', id], () => getSessionSchemaDetails(id as string), {
        enabled: !!id,
        onSettled: (_, error) => {
            if (error) toast(error.message, { type: 'error' })
        }
    })



    const handleSubmit = (payload: SessionSchemaFormValueType) => {
        toast('Editing form is currently disabled..', { type: 'error' })
    }

    return (
        <div>
            <MetaHead />


            <Navbar />

            <div className="px-3 my-10">

                {isLoading || !data ? <div className="alert alert-info max-w-2xl mx-auto">Loading...</div> :
                    <SessionSchemaView
                        heading="Edit Session Schema"
                        initialValues={data}
                        sessionSchemaId={id as string}
                        handleSubmit={handleSubmit}
                        waitingForServerResponse={false}
                    />}
            </div>
        </div>

    )
}

export default SessionSchemaEdit


const SessionSchemaView = ({ initialValues, handleSubmit, waitingForServerResponse, heading, sessionSchemaId }: {
    initialValues: SessionSchemaDetailsResponse,
    handleSubmit: (payload: SessionSchemaFormValueType) => void;
    waitingForServerResponse: boolean,
    heading: string,
    sessionSchemaId: string
}) => {
    // const [isChecked, setIsChecked] = useState(initialValues.is_public)
    const { mutateAsync } = useMutation('changeStateOfSessionSchema', changeStateOfSessionSchema)
    return <div className="form-container prose">

        <div className="flex justify-between items-center mb-4">
            <h2 className="my-4">Workout Routine</h2>


            {/* If public then show a btn to clone */}
            {initialValues.state === 'PRIVATE' ?
                <Link href={`/sessionSchema/${sessionSchemaId}/edit`}>
                    <div className="btn btn-xs"><PencilAltIcon className="w-5" />Edit</div>
                </Link>
                : (initialValues.state === 'PUBLIC' ?
                    <Link href={`/sessionSchema/${initialValues.id}/clone`}>
                        <button className="btn btn-xs"><DuplicateIcon className="w-5" />Clone</button>
                    </Link>
                    :
                    null
                )}
            {/* If pvt then show a btn to  edit */}


            {/* If in review then show a in review btn */}




        </div>




        {/* print schema name */}

        <div>
            <DescriptionText
                name="Name:"
                value={initialValues.session_name}
                size='med'
            />
            <DescriptionText
                name="number of superset workouts:"
                value={initialValues.number_of_superset_workouts}
                size='med'
            />
            <DescriptionText
                name="number of workouts:"
                value={initialValues.number_of_workouts}
                size='med'
            />
            <DescriptionText
                name="number of workouts in superset:"
                value={initialValues.number_of_workouts_in_superset}
                size='med'
            />
            <DescriptionText
                name="state:"
                value={
                    <div className="badge text-sm badge-warning">{initialValues.state}</div>
                }
                size='med'
            />
            {initialValues.state === 'PUBLIC' ? <DescriptionText
                name="Liked By:"
                value={
                    initialValues.votes_count
                }
                size='med'
            /> : null}
        </div>


        {initialValues.state === 'PRIVATE' ?
            <label className="label cursor-pointer -ml-1 my-0">
                <span className="label-text text-gray-500 text-xs uppercase font-bold">Make this workout routine public</span>
                <input type="checkbox" className="toggle toggle-md toggle-secondary" checked={initialValues.state !== 'PRIVATE'} onChange={(e) => {
                    if (confirm(`Are you sure you want to make this workout routine public? You will lose the access to edit this workout routine! The review might take some time, and we'll send you an email once it's approved.`)) {
                        mutateAsync({
                            schema_id: initialValues.id,
                        })
                    }
                }} />
            </label> : null}


        <div className="divider"></div>
        {/* Print all workout blocks */}
        {initialValues.schema_blocks.map((e, indx) => {
            return <div key={indx}>
                {'workout_id' in e ?
                    // workout instance
                    (
                        <RenderWorkoutView
                            target={e.default_target}
                            workoutName={e.workout.name}
                        />
                    )

                    :
                    // superset schema instance
                    (
                        <div className='my-2'>
                            <DescriptionText
                                name={'Superset Name:'}
                                value={e.name}
                            />

                            <div className="ml-2">
                                {e.superset_workout_schema.map((f, index) => (
                                    <RenderWorkoutView
                                        key={index}
                                        target={f.default_target}
                                        workoutName={f.workout.name}
                                    />
                                ))}
                            </div>

                        </div>
                    )
                }
            </div>

        })}
    </div>

}



const RenderWorkoutView = ({ workoutName, target }: {
    workoutName: string, target: any[]
}) => (
    <div className="my-3">
        <DescriptionText
            name="Workout Name:"
            value={workoutName}
        />
        <DescriptionText
            name="Target:"
            value={target.map((e: any, indx: number) => <span key={indx} className="badge mx-1 badge-sm">{e}</span>)}
        />
    </div>
)


export const DescriptionText = ({ name, value, size = 'small', type = 'justify-between' }: {
    name: string,
    value: any,
    size?: 'med' | 'small',
    type?: 'justify-between' | 'gap-2'
}) => (
    <div className={"flex flex-col sm:flex-row sm:items-center " + type}>
        <div className={"uppercase font-bold  text-gray-500 " + (size === 'small' ? 'text-2xs' : 'text-xs')}>{name}</div>
        <div className={"text-gray-900 " + (size === 'small' ? 'text-sm' : 'text-sm')}>{value}</div>
    </div>
)


// export const DescriptionTextLabel = ({ children, size = 'small' }: {
//     children: any,
//     size?: 'med' | 'small'
// }) => {
//     return (
//         <div className={"uppercase font-bold  text-gray-500 " + (size === 'small' ? 'text-2xs' : 'text-xs')}>{children}</div>
//     )
// }

// export const DescriptionTextValue = ({ children, size }: {
//     children: any,
//     size?: 'med' | 'small'
// }) => {
//     return (
//         <div className={"text-gray-900 " + (size === 'small' ? 'text-sm' : 'text-base')}>{children}</div>
//     )
// }
