import { EyeIcon, InformationCircleIcon, PencilAltIcon } from "@heroicons/react/solid";
import { SessionInstanceAllActiveResponse, SessionInstanceStartResponse, SessionSchemaAllResponse } from "@sigmafit/commons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query"
import { toast } from "react-toastify";
import { ErrorResponse, getAllActiveSessions, getAllSessionSchemaOwnedByUser, startANewSessionFromSchemaId } from "../api";
import { MetaHead } from "../components/Head";
import { Navbar } from "../components/Navbar";
import { withAuthHOC } from "../hooks/withAuthHOC";





const Dash = () => {
    const { data: activeSessions, isLoading: isActiveSessionsLoading } = useQuery<SessionInstanceAllActiveResponse, ErrorResponse>('getAllActiveSessions', getAllActiveSessions, {
        onSettled: (_, error) => {
            if (error) toast(error.message, { type: 'error' })
        },
        retry: false
    });


    const { data: sessionSchema, isLoading: isSessionSchemaLoading } = useQuery<SessionSchemaAllResponse, ErrorResponse>('getAllSessionSchemaOwnedByUser', getAllSessionSchemaOwnedByUser, {
        onSettled: (_, error) => {
            if (error) toast(error.message, { type: 'error' })
        },
        retry: false
    });


    const { isLoading: waitingForMutateServerResponse, mutate } = useMutation<SessionInstanceStartResponse, ErrorResponse, string>(startANewSessionFromSchemaId)

    const router = useRouter()

    return (
        <>

            <MetaHead />
            <Navbar />


            <div className="max-w-2xl mx-auto my-12 prose px-2">
                {/* Show current active sessions if any */}

                <h2>Active Sessions</h2>
                <div className="my-3">
                    {activeSessions ?

                        <>

                            <div className="alert my-2 alert-info py-2 text-xs">
                                <div>
                                    <InformationCircleIcon className="w-6" />
                                    Pro tip: Click on any one of these active session to continue from where you left...
                                </div>
                            </div>

                            <div>{activeSessions.map((e, indx: number) => {

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

                    {activeSessions && activeSessions.length === 0 ? <div className="alert my-2 alert-info">No Active sessions... 😢</div> : null}

                </div>


                {/* A button to start a new session */}


                {/* Show sessions */}
                <h2>Workout Routines</h2>

                <div className="flex justify-between">
                    <Link href='sessionSchema/top'>
                        <div className="btn btn-primary btn-sm">Explore top routines</div>
                    </Link>

                    <Link href='sessionSchema/new'>
                        <div className="btn btn-primary btn-sm">Create a customized one</div>
                    </Link>

                </div>

                {sessionSchema && sessionSchema.length === 0 ? <div className="alert my-2 alert-info">No schemas... Let&apos;s add a new one?</div> : null}

                {isSessionSchemaLoading ? <div className="alert my-2 alert-info">Loading Session Schemas...</div> : null}


                {sessionSchema ? <>

                    {/* <div className="alert my-2 alert-warning py-2 text-xs">
                        <div>
                            <InformationCircleIcon className="w-6" />
                            Pro tip: Click on any one of the inActive session to start a new session...
                        </div>
                    </div> */}


                    {sessionSchema.map((e, indx: number) => {

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
                                            href={`/sessionSchema/${e.id}/view`}
                                        >
                                            <div
                                                className="sm:absolute  btn sm:top-1 sm:right-1 btn-xs cursor-pointer select-none ">

                                                <EyeIcon className="w-4 mr-1" />
                                                View
                                            </div>
                                        </Link>



                                        <button

                                            disabled={e.end_timestamp === null || waitingForMutateServerResponse} onClick={() => {
                                                const res = confirm(`Are you sure you want to start a new [${e.name}] session?`)
                                                if (res) {
                                                    // start a new session
                                                    mutate(e.id, {
                                                        onSettled(data, error, variables, context) {
                                                            if (error) {
                                                                toast(error.message, {
                                                                    type: 'error'
                                                                })
                                                            } else if (data) {
                                                                toast('Redirecting to active session dash..', {
                                                                    type: 'success',
                                                                    autoClose: 1000,
                                                                    onClose: () => {
                                                                        router.push(`/sessionInstance/${data.id}`)
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


export default withAuthHOC(Dash)
