import { InformationCircleIcon, PencilAltIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query"
import { toast } from "react-toastify";
import { getAllActiveSessions, getAllSchemasOwnedByUser as getAllSessionSchemaOwnedByUser, startANewSessionFromSchemaId } from "../api";
import { Navbar } from "../components/Navbar";





const Dash = () => {

    const { data: activeSessions, isLoading: isActiveSessionsLoading } = useQuery('activeSessions', getAllActiveSessions, {
        onSettled: (data) => {
            if (data?.error) toast(data.message, { type: 'error' })
        }
    });


    const { data: sessionSchema, isLoading: isSessionSchemaLoading } = useQuery('schemas', getAllSessionSchemaOwnedByUser, {
        onSettled: (data) => {
            if (data?.error) toast(data.message, { type: 'error' })
        }
    });


    const { isLoading: waitingForServerResponse, mutate, error, data } = useMutation(startANewSessionFromSchemaId)




    const router = useRouter()

    return (
        <>

            <Navbar />


            <div className="max-w-2xl mx-auto my-12 prose px-2">
                {/* Show current active sessions if any */}

                <h2>Active Sessions</h2>
                <div className="my-3">
                    {activeSessions && !activeSessions.error && activeSessions.activeInstances.length ?

                        <>

                            <div className="alert my-2 alert-info py-2 text-xs">
                                <div>
                                    <InformationCircleIcon className="w-6" />
                                    Pro tip: Click on any one of these active session to continue from where you left...
                                </div>
                            </div>

                            <div>{activeSessions.activeInstances.map((e: any, indx: number) => {

                                const date = (new Date(e.start_timestamp))
                                const dateString = `${date.toLocaleTimeString()}, ${date.toDateString()}`
                                return (
                                    <div key={indx}>
                                        <div onClick={() => {
                                            router.push(`/sessionInstance/${e.id}`)
                                        }} className="p-4 flex flex-col gap-1 text-sm text-inherit py-2 px-4 transition rounded-md bg-black/[.09] hover:bg-black/[.19] cursor-pointer select-none my-3">
                                            <div>
                                                <span className="font-bold mr-1">Session Name:</span>
                                                {e.session_schema.name}
                                            </div>

                                            <div>
                                                Started At: {dateString}
                                            </div>

                                        </div>

                                    </div>
                                )
                            })}</div>
                        </>


                        : null}

                    {isActiveSessionsLoading ? <div className="alert my-2 alert-info">Loading Active sessions...</div> : null}

                    {activeSessions && !activeSessions.error && activeSessions.activeInstances.length===0 ? <div className="alert my-2 alert-info">No Active sessions... 😢</div> : null}

                </div>


                {/* A button to start a new session */}


                {/* Show sessions */}
                <h2>Your Session Schema</h2>

                <div className="flex justify-end">
                    <Link href='sessionSchema/new'>
                        <div className="btn btn-primary btn-sm">Create new session schema</div>
                    </Link>

                </div>

                {sessionSchema && !sessionSchema.error && sessionSchema.schemas.length===0 ? <div className="alert my-2 alert-info">No schemas... Let&apos;s add a new one?</div> : null}

                {isSessionSchemaLoading ? <div className="alert my-2 alert-info">Loading Session Schemas...</div> : null}


                {sessionSchema && !sessionSchema?.error ? <>

                    {/* <div className="alert my-2 alert-warning py-2 text-xs">
                        <div>
                            <InformationCircleIcon className="w-6" />
                            Pro tip: Click on any one of the inActive session to start a new session...
                        </div>
                    </div> */}


                    {sessionSchema.schemas.map((e: any, indx: number) => {

                        const date = (new Date(e.last_attempted_at))
                        const dateString = e.last_attempted_at ? `${date.toLocaleTimeString()}, ${date.toDateString()}` : 'Never'
                        return (
                            <div key={indx}>
                                <div

                                    className="relative w-full p-4 flex flex-col gap-1 text-sm text-inherit py-2 px-4 rounded-md bg-black/[.09] my-3">


                                    <div>
                                        <span className="font-bold mr-1">Session Name:</span>
                                        {e.name}
                                    </div>

                                    <div>
                                        <span className="font-bold mr-1">Last Attempted:</span>
                                        {dateString}
                                    </div>

                                    <div>
                                        <span className="font-bold mr-1">Is Active:</span>
                                        {e.end_timestamp === null ? 'Yes' : 'No'}
                                    </div>


                                    <div className="flex justify-between mt-2">
                                        <Link
                                            href={`/sessionSchema/${e.id}`}
                                        >
                                            <div
                                                className="sm:absolute  btn sm:top-1 sm:right-1 btn-xs cursor-pointer select-none ">

                                                <PencilAltIcon className="w-4 mr-1" />
                                                Edit
                                            </div>
                                        </Link>



                                        <button

                                            disabled={e.end_timestamp === null} onClick={() => {
                                                const res = confirm(`Are you sure you want to start a new [${e.name}] session?`)
                                                if (res) {
                                                    // start a new session
                                                    mutate(e.id, {
                                                        onSettled(data, error, variables, context) {
                                                            if (data?.error) {
                                                                toast(data.message, {
                                                                    type: 'error'
                                                                })
                                                            } else {
                                                                toast('Redirecting to active session dash..', {
                                                                    type: 'success',
                                                                    onClose: () => {
                                                                        router.push(`/sessionInstance/${(data as any).data.id}`)
                                                                    }
                                                                })
                                                            }
                                                        },
                                                    })
                                                    // invalidate cache


                                                }
                                            }}
                                            className="sm:absolute  btn sm:bottom-1 sm:right-1 btn-xs  cursor-pointer select-none "> Start new session</button>

                                    </div>

                                </div>

                            </div>
                        )
                    })}

                </> : null}





                {/* A button to create new session */}


                {/* A button to explore workouts */}



            </div>

        </>
    )
}


export default Dash
