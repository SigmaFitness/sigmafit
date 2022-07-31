import {
  WorkoutFormOptionsResponse,
  WorkoutListResponse,
  Workout_AddOrModify_Request,
  Workout_AddOrModify_Response,
} from "@sigmafit/commons";
import { Formik, Form } from "formik";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  addNewOrModifyWorkoutMutation,
  ErrorResponse,
  getNewWorkoutAddFormOptions,
} from "../api";
import { FormikTextAreaField } from "./FormikTextAreaField";
import { FormSingleSelectFormikField } from "./FormSingleSelectField";
import { FormInputField } from "./InputField";
import { SigmaModal } from "./SigmaModal";

export const defaultInitialValues_WorkoutForm = {
  name: "",
  category: "",
  intensity: "",
  target_body_part: "",
  notes: "",
  workout_image_url: "",
};

export const CreateNewOrEditWorkoutModal: React.FC<{
  isModalOpen: boolean;
  initialValues?: typeof defaultInitialValues_WorkoutForm;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  existingWorkoutId?: string;
}> = ({
  isModalOpen,
  setIsModalOpen,
  initialValues = defaultInitialValues_WorkoutForm,
  existingWorkoutId,
}) => {
  const queryClient = useQueryClient();

  const isEditMode = existingWorkoutId && existingWorkoutId !== "";

  // To be used only for create mode
  const { isLoading: addWorkoutWaitingForServerResponse, mutate } = useMutation<
    Workout_AddOrModify_Response,
    ErrorResponse,
    Workout_AddOrModify_Request
  >(addNewOrModifyWorkoutMutation, {
    onSuccess: (data) => {
      const prevWorkouts =
        queryClient.getQueryData<WorkoutListResponse>("getAllWorkouts");

      if (prevWorkouts) {
        const newWorkouts = {
          ...prevWorkouts,
          myWorkouts: isEditMode
            ? [...prevWorkouts.myWorkouts.filter((e) => e.id !== data.workout.id), data.workout]
            : [...prevWorkouts.myWorkouts, data.workout],
        };
        queryClient.setQueryData("getAllWorkouts", newWorkouts);
      }

      toast(`Workout ${isEditMode ? "edited" : "added"} successfully!`, {
        type: "success",
      });
      setIsModalOpen(false);
    },
    onError: (err) => {
      toast(err.message, { type: "error" });
    },
  });

  const { data: formOptions } = useQuery<
    WorkoutFormOptionsResponse,
    ErrorResponse
  >("getNewWorkoutAddFormOptions", getNewWorkoutAddFormOptions, {
    onSettled: (data, error) => {
      if (error) toast(error.message, { type: "error" });
    },
  });

  const handleSubmit = async (
    values: typeof defaultInitialValues_WorkoutForm
  ) => {
    mutate({
      ...values,
      id: existingWorkoutId, // if undefined it will be removed by the helper funx in api.ts
    } as any);
  };

  if (isModalOpen) {
    return (
      <>
        {isModalOpen ? (
          <SigmaModal
            isOpen={isModalOpen}
            setIsOpen={(newVal: boolean) => setIsModalOpen(newVal)}
          >
            <div className="mt-16">
              <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form className="text-black" autoComplete="off">
                  <div className="prose text-center my-4">
                    <h2>{isEditMode ? "Edit" : "Add New"} Workout</h2>
                  </div>

                  <div className="alert alert-sm text-xs alert-warning my-2">
                    We already have 100+ registered workouts, with detailed
                    description, quick tips etc. Please ensure that there
                    isn&apos;t an existing workout you&apos;re trying to{" "}
                    {isEditMode ? "edit" : "add"}.
                  </div>

                  <FormInputField
                    fieldId="name"
                    fieldLabel="Name"
                    placeholder="Lateral Raises"
                  />

                  <FormSingleSelectFormikField
                    fieldId="category"
                    fieldLabel="Category"
                    options={
                      formOptions
                        ? formOptions.category.map((e: any) => ({
                            value: e,
                            label: e,
                          }))
                        : []
                    }
                  />

                  <FormSingleSelectFormikField
                    fieldId="target_body_part"
                    fieldLabel="Target body part"
                    options={
                      formOptions
                        ? formOptions.target_body_part.map((e: any) => ({
                            value: e,
                            label: e,
                          }))
                        : []
                    }
                  />

                  <FormSingleSelectFormikField
                    fieldId="intensity"
                    fieldLabel="Intensity"
                    options={
                      formOptions
                        ? formOptions.intensity.map((e: any) => ({
                            value: e,
                            label: e,
                          }))
                        : []
                    }
                  />

                  <FormInputField
                    fieldId="workout_image_url"
                    fieldLabel="Workout Image Link"
                    placeholder="https://..."
                    type="url"
                  />

                  <FormikTextAreaField
                    fieldId="notes"
                    fieldLabel="Notes"
                    placeholder="Directions to perform the workout..."
                  />

                  <div className="flex items-center justify-between">
                    <button
                      className="btn"
                      type="submit"
                      disabled={addWorkoutWaitingForServerResponse}
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </SigmaModal>
        ) : null}
      </>
    );
  }
  return null;
};
