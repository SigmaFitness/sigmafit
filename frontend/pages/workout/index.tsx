import { XIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { ErrorResponse, getAllWorkouts } from "../../api";
import { Navbar } from "../../components/Navbar";



const Workouts = () => {

    const { data, isLoading } = useQuery<any,ErrorResponse>('workouts', getAllWorkouts, {
        onSettled: (data, error) => {
            if (error) toast(error.message, { type: 'error' })
        }
    });

    return (
        <div>


            <Navbar />

            <div className="my-10 prose max-w-2xl mx-auto px-2">

                <h2>My workouts</h2>
                <Link href="/workout/new/">
                    <button className="btn btn-primary">Add a new workout</button>
                </Link>

                {isLoading && <div className="my-4 alert alert-info">Loading workouts...</div>}
                {data && !data?.error ? <RenderWorkouts
                    canDelete={true}
                    workouts={data.myWorkouts}
                /> : null}




                <h2>Public Workouts</h2>

                {data && !data?.error ? <RenderWorkouts
                    canDelete={false}
                    workouts={data.publicWorkouts}
                /> : null}
            </div>
        </div>
    )
}


const RenderWorkouts = ({ workouts, canDelete }: { workouts: any, canDelete: boolean }) => {
    return (
        <>
            {workouts.length? workouts.map((workout: any, index: number) => {
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
            }): <div className="alert alert-info my-2">No workouts found</div>}

        </>
    )
}

export default Workouts;
