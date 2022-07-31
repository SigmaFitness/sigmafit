import {
  WorkoutListResponse,
  Workout_Delete_Response,
} from "@sigmafit/commons";
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
import { withAuthHOC } from "../../hooks/withAuthHOC";
import { Footer } from "../../components/Footer";
import { RenderWorkoutsList } from "../../components/RenderWorkoutsList";



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
          <RenderWorkoutsList
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

        {data ? <RenderWorkoutsList workouts={data.publicWorkouts} /> : null}
      </div>

      <CreateNewOrEditWorkoutModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        initialValues={workoutInitialData.initialValues}
        existingWorkoutId={workoutInitialData.existingWorkoutId}
      />
      <Footer />

    </div>
  );
};

export default withAuthHOC(Workouts);
