import { XIcon } from "@heroicons/react/solid";
import { WorkoutListResponse } from "@sigmafit/commons";
import Link from "next/link";
import { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { ErrorResponse, getAllWorkouts } from "../../api";
import { CreateNewWorkoutModal } from "../../components/CreateNewWorkoutModal";
import { Navbar } from "../../components/Navbar";



const Workouts = () => {

    const { data, isLoading } = useQuery<WorkoutListResponse, ErrorResponse>('getAllWorkouts', getAllWorkouts, {
        onSettled: (data, error) => {
            if (error) toast(error.message, { type: 'error' })
        }
    });

    const [newWorkoutModalState, setNewWorkoutModalState] = useState<{
        state: boolean;
        initialValue: string;
    }>({ state: false, initialValue: '' })

    return (
        <div>

            <div className="alert alert-error rounded-none alert-sm text-center w-full flex justify-center">Route Deprecated</div>
            <Navbar />

            <div className="my-10 prose max-w-2xl mx-auto px-2">

                <h2>My workouts</h2>
                <button className="btn btn-primary" onClick={() => setNewWorkoutModalState(e => ({ ...e, state: true }))}>Add a new workout</button>

                {isLoading && <div className="my-4 alert alert-info">Loading workouts...</div>}
                {data ? <RenderWorkouts
                    canDelete={true}
                    workouts={data.myWorkouts}
                /> : null}




                <h2>Public Workouts</h2>

                {data ? <RenderWorkouts
                    canDelete={false}
                    workouts={data.publicWorkouts}
                /> : null}
            </div>

            <CreateNewWorkoutModal
                isModalOpen={newWorkoutModalState}
                setIsModalOpen={setNewWorkoutModalState}

            />
        </div>
    )
}


const RenderWorkouts = ({ workouts, canDelete }: { workouts: any, canDelete: boolean }) => {
    return (
        <>
            {workouts.length ? workouts.map((workout: any, index: number) => {
                return (


                    <div className="w-full relative" key={index}>
                        <button onClick={() => {
                            alert('Delete is disabled for now! Sorry for the inconvenience.')
                        }} className={`${!canDelete ? 'hidden' : ''} badge badge-secondary h-6 absolute right-4 -top-2`}><XIcon className="w-4 mr-1" /> Delete</button>
                        <div
                            className="p-4 flex flex-col gap-1 text-sm text-inherit py-2 px-4 transition rounded-md bg-black/[.09] my-3"
                        >
                            <div>
                                <div className="inline-block font-bold mr-1">Name:</div>
                                <div className="inline-block">{workout.name}</div>
                            </div>

                            <div>
                                <div className="inline-block font-bold mr-1">Category:</div>
                                <div className="inline-block">{workout.category}</div>
                            </div>

                            <div>
                                <div className="inline-block font-bold mr-1">Target Body Part:</div>
                                <div className="inline-block">{workout.target_body_part ?? 'NO_DATA'}</div>
                            </div>

                            <div>
                                <div className="inline-block font-bold mr-1">Intensity</div>
                                <div className="inline-block">{workout.intensity ?? 'NO_DATA'}</div>
                            </div>
                        </div>
                    </div>




                )
            }) : <div className="alert alert-info my-2">No workouts found</div>}

        </>
    )
}

export default Workouts;
