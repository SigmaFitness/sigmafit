import { ArrowLeftIcon, ArrowRightIcon, ClipboardCopyIcon, LinkIcon, ShareIcon, ThumbUpIcon } from "@heroicons/react/solid"
import { SessionSchemaVoteRequest, SessionSchemaVoteResponse, SessionSchema_Top_Request, SessionSchema_Top_Response } from "@sigmafit/commons"
import Link from "next/link"
import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { toast } from "react-toastify"
import { ErrorResponse, getTopSessionSchema, voteASessionSchema } from "../../api"
import { MetaHead } from "../../components/Head"
import { Navbar } from "../../components/Navbar"
import { DescriptionText } from "./[id]/view"



const TopSessionSchema = () => {
    const [cursorIdArr, setCursorIdArr] = useState<SessionSchema_Top_Request['cursor_id'][]>([null])
    const [currentPageIndex,setCurrentPageIndex]=useState(0)

    
    const { isLoading, data } = useQuery<SessionSchema_Top_Response, ErrorResponse>(['getTopSessionSchema', cursorIdArr[currentPageIndex]], () => getTopSessionSchema({cursor_id: cursorIdArr[currentPageIndex]}))

    const client = useQueryClient()
    const { mutate, isLoading: waitingForServerResponseForVote, variables } = useMutation<SessionSchemaVoteResponse, ErrorResponse, SessionSchemaVoteRequest>('voteASessionSchema', voteASessionSchema, {
        onSuccess: () => {
            client.refetchQueries('getTopSessionSchema')
        }
    })

    return (
        <div>
            <MetaHead />

            <Navbar />
            <div className="my-10 max-w-2xl mx-auto px-2 prose">
                <h2>Top workout routines</h2>

                {isLoading || !data ? <div className="alert">Loading..</div> :

                    <div>
                        {data.results.map(e => {
                            const isVoted = e.session_schema_vote_by_user.length
                            return (


                                <div className="my-2 card bg-red-100" key={e.id}>
                                    {/* have a card to show top workouts */}

                                    <div className="card-body">
                                        <div className="card-title uppercase text-lg font-extrabold">{e.name}</div>
                                        <DescriptionText
                                            name="number of superset workouts:"
                                            value={e.number_of_superset_workouts}
                                        />
                                        <DescriptionText
                                            name="number of workouts:"
                                            value={e.number_of_workouts}
                                        />
                                        <DescriptionText
                                            name="number of workouts in superset:"
                                            value={e.number_of_workouts_in_superset}
                                        />
                                        <DescriptionText
                                            name="votes count:"
                                            value={e.votes_count}
                                        />
                                        <DescriptionText
                                            name="Created By:"
                                            value={'@' + e.owner.first_name}
                                        />

                                        <div className="flex flex-row mx-2 justify-between sm:justify-around">
                                            <button
                                                disabled={waitingForServerResponseForVote && e.id === variables?.schema_id}
                                                className={"btn btn-outline btn-sm space-x-2 " + (isVoted ? 'text-red-500' : '')}
                                                onClick={async () => {
                                                    mutate({
                                                        schema_id: e.id,
                                                        state: !isVoted
                                                    })
                                                }}>
                                                <ThumbUpIcon className="w-5 " /> <span>{isVoted? 'Liked':'Like'}</span>
                                            </button>
                                            <div className="btn-outline btn btn-sm space-x-2 " onClick={() => {
                                                toast('Link successfully copied to clipboard', { type: 'info' })
                                                const link = `${window.location.origin}/sessionSchema/${e.id}/view`
                                                navigator.clipboard.writeText(link);
                                            }}>
                                                <ShareIcon className="w-5 " /> <span>Share</span>
                                            </div>
                                            <Link href={`/sessionSchema/${e.id}/clone`}>
                                                <div className="btn-outline btn-sm btn space-x-2">
                                                    <ClipboardCopyIcon className="w-5" /> <span>Clone</span>
                                                </div>
                                            </Link>

                                        </div>

                                    </div>
                                </div>
                            )
                        })}


                        <div className="flex justify-between mx-2">
                            <button disabled={currentPageIndex === 0} className="btn btn-sm" onClick={() => {
                                setCursorIdArr(e => e.slice(0,e.length-1))
                                setCurrentPageIndex((val) => val-1)
                            }}>
                                <ArrowLeftIcon className="w-6" />
                            </button>
                            <button disabled={data.next_cursor === null} className="btn btn-sm" onClick={() => {
                                setCursorIdArr(e=> [...e, data.next_cursor])
                                setCurrentPageIndex((val) => val+1)
                            }}>
                                <ArrowRightIcon className="w-6" />
                            </button>
                        </div>

                    </div>}




            </div>
        </div>

    )
}

export default TopSessionSchema
