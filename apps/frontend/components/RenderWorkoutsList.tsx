import { DocumentIcon, PencilAltIcon, XIcon } from "@heroicons/react/solid";
import { workout } from "@sigmafit/commons/dist/prismaGenTypes";
import { useState } from "react";
import { SigmaModal } from "./SigmaModal";
import ReactMarkdown from 'react-markdown';

export const RenderWorkoutsList = ({
  workouts, handleDelete, handleEdit,
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
              <div className="flex flex-col xs:mr-36 items-center xs:flex-row py-3 gap-3 text-sm text-inherit px-2">
                <div className="avatar">
                  {/* hidden sm:block */}
                  <div className="w-36 xs:w-24 rounded-full">
                    <img
                      className="m-0 object-center"
                      src={workout.workout_image_url} />
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
                    <div className="inline-block font-bold mr-1">Intensity:</div>
                    <div className="inline-block">
                      {(workout.intensity ?? "NO_DATA").replaceAll("_", " ")}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-around gap-2 flex-col xs:absolute xs:right-2 xs:-top-1">
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
                    src={workouts[isNotesModalWorkoutIndex].workout_image_url} />
                </div>
              </div>
              <h2>{workouts[isNotesModalWorkoutIndex].name}</h2>
            </div>

            <div>
              <h3 className="font-black text-blue-500 mb-4">Notes &amp; Instructions</h3>

              <ReactMarkdown>{workouts[isNotesModalWorkoutIndex].notes
                ? workouts[isNotesModalWorkoutIndex].notes
                : "No Data"}</ReactMarkdown>

            </div>
          </div>
        </SigmaModal>
      )}

    </>
  );
};
