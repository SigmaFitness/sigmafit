import { DocumentIcon, PencilAltIcon, XIcon } from "@heroicons/react/solid";
import {
  WorkoutListResponse,
  Workout_Delete_Response,
} from "@sigmafit/commons";
import { workout } from "@sigmafit/commons/dist/prismaGenTypes";
import Link from "next/link";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { deleteWorkout, ErrorResponse, getAllWorkouts } from "../../api";
import {
  CreateNewOrEditWorkoutModal,
  defaultInitialValues_WorkoutForm,
} from "../../components/CreateNewOrEditWorkoutModal";
import { MetaHead } from "../../components/Head";
import { Navbar } from "../../components/Navbar";
import { SigmaModal } from "../../components/SigmaModal";

const Workouts = () => {
  const { data, isLoading } = useQuery<WorkoutListResponse, ErrorResponse>(
    "getAllWorkouts",
    getAllWorkouts,
    {
      onSettled: (data, error) => {
        if (error) toast(error.message, { type: "error" });
      },
    }
  );

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const {
    mutate,
    isLoading: waitingForServerResponseForDeleteWorkout,
    variables,
  } = useMutation<Workout_Delete_Response, ErrorResponse, string>(
    "deleteWorkout",
    deleteWorkout,
    {
      onError(error) {
        toast(error.message, { type: "error" });
      },
      onSuccess(data) {
        const workouts =
          queryClient.getQueryData<WorkoutListResponse>("getAllWorkouts");
        if (workouts) {
          queryClient.setQueriesData<WorkoutListResponse>("getAllWorkouts", {
            publicWorkouts: workouts.publicWorkouts,
            myWorkouts: workouts.myWorkouts.filter(
              (e) => e.id !== data.deleted_workout_id
            ),
          });
        }

        toast(data.message, { type: "success" });
      },
    }
  );

  const [workoutInitialData, setWorkoutInitialData] = useState({
    initialValues: defaultInitialValues_WorkoutForm,
    existingWorkoutId: "",
  });

  return (
    <div>
      <MetaHead title="Manage Workouts" />
      <Navbar />

      <div className="my-10 prose max-w-2xl mx-auto px-2">
        <h2>My workouts</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            setWorkoutInitialData({
              initialValues: defaultInitialValues_WorkoutForm,
              existingWorkoutId: "",
            });
            setIsModalOpen(true);
          }}
        >
          Add a new workout
        </button>

        {isLoading && (
          <div className="my-4 alert alert-info">Loading workouts...</div>
        )}
        {data ? (
          <RenderWorkouts
            handleDelete={(workout_id) => {
              if (
                confirm(
                  "Are you sure you want to delete? This action is irreversible."
                )
              ) {
                mutate(workout_id);
              }
            }}
            workouts={data.myWorkouts}
            handleEdit={(workout) => {
              setWorkoutInitialData({
                initialValues: {
                  category: workout.category ?? "",
                  intensity: workout.intensity ?? "",
                  name: workout.name ?? "",
                  target_body_part: workout.target_body_part ?? "",
                  notes: workout.notes ?? "",
                  workout_image_url: workout.workout_image_url ?? "",
                },
                existingWorkoutId: workout.id,
              });
              setIsModalOpen(true);
            }}
          />
        ) : null}

        <h2>Public Workouts</h2>

        {data ? <RenderWorkouts workouts={data.publicWorkouts} /> : null}
      </div>

      <CreateNewOrEditWorkoutModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        initialValues={workoutInitialData.initialValues}
        existingWorkoutId={workoutInitialData.existingWorkoutId}
      />
    </div>
  );
};

const RenderWorkouts = ({
  workouts,
  handleDelete,
  handleEdit,
}: {
  workouts: workout[];
  handleDelete?: (workout_id: string) => void;
  handleEdit?: (initialWorkoutValues: workout) => void;
}) => {
  const [isNotesModalWorkoutIndex, setIsNotesModalWorkoutIndex] = useState(-1); // -1 means closed

  return (
    <>
      {workouts.length ? (
        workouts.map((workout, index: number) => {
          return (
            <div
              className="w-full relative my-4 transition rounded-md bg-base-200  py-2 px-2"
              key={index}
            >
              <div className="flex flex-col items-center xs:flex-row py-3 gap-3 text-sm text-inherit px-2">
                <div className="avatar">
                  {/* hidden sm:block */}
                  <div className="w-36 xs:w-24 rounded-full">
                    <img
                      className="m-0 object-center"
                      src={workout.workout_image_url}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div>
                    <div className="inline-block font-bold mr-1">Name:</div>
                    <div className="inline-block">
                      {workout.name.replaceAll("_", " ")}
                    </div>
                  </div>

                  <div>
                    <div className="inline-block font-bold mr-1">Category:</div>
                    <div className="inline-block">
                      {workout.category.replaceAll("_", " ")}
                    </div>
                  </div>

                  <div>
                    <div className="inline-block font-bold mr-1">
                      Target Body Part:
                    </div>
                    <div className="inline-block">
                      {(workout.target_body_part ?? "NO_DATA").replaceAll(
                        "_",
                        " "
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="inline-block font-bold mr-1">Intensity</div>
                    <div className="inline-block">
                      {(workout.intensity ?? "NO_DATA").replaceAll("_", " ")}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-around gap-2 flex-col sm:absolute sm:right-2 sm:-top-1">
                {handleDelete && (
                  // TODO: shall we disable the btn once hit for sometime?
                  <button
                    onClick={() => handleDelete(workout.id)}
                    className="btn btn-xs btn-secondary"
                  >
                    <XIcon className="w-4 mr-1" /> Delete
                  </button>
                )}

                {handleEdit && (
                  <button
                    onClick={() => handleEdit(workout)}
                    className="btn btn-xs btn-accent h-6"
                  >
                    <PencilAltIcon className="w-4 mr-1" /> Edit
                  </button>
                )}

                <button
                  onClick={() => setIsNotesModalWorkoutIndex(index)}
                  className="btn btn-xs btn-primary h-6"
                >
                  <DocumentIcon className="w-4 mr-1" /> View Notes
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div className="alert alert-info my-2">No workouts found</div>
      )}

      {isNotesModalWorkoutIndex !== -1 && workouts.length && (
        <SigmaModal
          isOpen={isNotesModalWorkoutIndex !== -1}
          setIsOpen={() => setIsNotesModalWorkoutIndex(-1)}
        >
          <div className="flex flex-col gap-2">
            <div className="flex gap-4">
              <div className="avatar ">
                <div className="w-24 rounded-full">
                  <img
                    className="m-0"
                    src={workouts[isNotesModalWorkoutIndex].workout_image_url}
                  />
                </div>
              </div>
              <h2>{workouts[isNotesModalWorkoutIndex].name}</h2>
            </div>

            <div>
              <h3>Notes &amp; Instructions</h3>
              {workouts[isNotesModalWorkoutIndex].notes
                ? workouts[isNotesModalWorkoutIndex].notes
                : "No Data"}
            </div>
          </div>
        </SigmaModal>
      )}
    </>
  );
};

export default Workouts;
