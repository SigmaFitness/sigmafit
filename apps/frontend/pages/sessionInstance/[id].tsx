import type { NextPage } from "next";
import { MetaHead } from "../../components/Head";
import { Navbar } from "../../components/Navbar";
import { Fragment, useEffect, useState } from "react";
import { Field, FieldArray, Form, Formik, useFormikContext } from "formik";
import Image from "next/future/image";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  TicketIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import * as yup from "yup";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  endSessionInstance,
  ErrorResponse,
  getSessionInstanceDetails,
  sessionInstanceAddOrModifyBlock,
} from "../../api";
import { toast } from "react-toastify";
import {
  SessionInstanceAddOrModifyBlockRequest,
  SessionInstanceAddOrModifyBlockResponse,
  SessionInstanceStateResponse,
  SessionInstanceState_SetData,
} from "@sigmafit/commons";
import { DescriptionText } from "../sessionSchema/[id]/view";
import { Menu, Transition } from "@headlessui/react";
import { withAuthHOC } from "../../hooks/withAuthHOC";

const timeSince = (startDate: Date) => {
  const seconds = (Date.now() - startDate.getTime()) / 1000;
  let finalString = "";
  const hours = seconds / 3600;
  const minutes = (seconds % 3600) / 60;
  const leftSeconds = seconds % 60;

  if (hours >= 1) {
    finalString += Math.floor(hours) + " hours, ";
  }
  if (minutes >= 1) {
    finalString += Math.floor(minutes) + " minutes, ";
  }
  return finalString + Math.floor(leftSeconds) + " seconds ago";
};

const getInitialSetValue = (
  workout_category: SessionInstanceStateResponse["session_workouts"][number]["workout_category"]
) => {
  if (workout_category === "DISTANCE_AND_DURATION") {
    return { values: [{ distance: "", duration: "" }] };
  } else if (workout_category === "DURATION") {
    return { values: [{ duration: "" }] };
  } else if (workout_category === "REPS") {
    return { values: [{ reps: "" }] };
  } else if (workout_category === "WEIGHT_AND_REPS") {
    return { values: [{ reps: "", weight: "" }] };
  } else {
    throw new Error("Invalid workout_category");
  }
};

const SessionInstance: NextPage = () => {
  const [startDate, setStartDate] = useState(new Date());

  const [workoutIndex, setWorkoutIndex] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();

  const [timeSinceVal, setTimeSinceVal] = useState("0 seconds ago");

  const router = useRouter();
  const { id: sessionInstanceId } = router.query;

  const handleBack = () => {
    setWorkoutIndex((val) => val - 1);
  };

  const {
    isLoading: isMutationResultLoading,
    isError,
    mutateAsync,
  } = useMutation<
    SessionInstanceAddOrModifyBlockResponse,
    ErrorResponse,
    SessionInstanceAddOrModifyBlockRequest
  >(sessionInstanceAddOrModifyBlock, {
    onSettled(data, error) {
      if (error) {
        toast(error.message, { type: "error" });
      }
    },
  });

  const queryClient = useQueryClient();

  const handleAddOrModifyBlockSubmit = async (values: {
    sets_data: SessionInstanceState_SetData[];
  }) => {
    try {
      // get data from formik
      const sets_data: SessionInstanceState_SetData[] = [];

      values.sets_data.forEach((e) => {
        const current: SessionInstanceState_SetData["values"] = [];
        let isFirstEmpty = false;
        e.values.every((f, indx) => {
          let numberOfEmptyValues = 0;
          Object.keys(f).forEach(
            (t) => (numberOfEmptyValues += Number((f as any)[t] === ""))
          );
          if (numberOfEmptyValues !== Object.keys(f).length) current.push(f);
          else if (indx == 0) {
            isFirstEmpty = true;
          }
          return true;
        });

        if (current.length && isFirstEmpty) {
          // no dropset can be used
          throw new Error("Cannot have a drop set without the actual one!");
        }

        if (current.length)
          sets_data.push({
            values: current,
          });
      });

      // make request
      if (
        sets_data.length !== 0 &&
        values.sets_data !=
          workouts[workoutIndex].current_workout_instance_sets_data
      ) {
        try {
          const res = await mutateAsync({
            block_type: workouts[workoutIndex].type,
            session_instance_id: sessionInstanceId as string,
            id: workouts[workoutIndex].superset_or_classic_workout_schema_id,
            sets_data,
          });

          // refetch
          // TODO: Since we already have the data, it's better to do optimistic updates (after the original update is successful instead of refetching)
          queryClient.refetchQueries([
            "getSessionInstanceDetails",
            sessionInstanceId,
          ]);
        } catch (_) {
          return;
        }
      }

      // if success then add to next exercise
      if (workoutIndex + 1 !== workouts.length)
        setWorkoutIndex((val) => val + 1);
      else {
        // if end then ask them if we should stop the exercise
        if (
          confirm(
            "Yay! 🥳 That was the last workout. Do you want to end this session?"
          )
        ) {
          toast("Ending session", { type: "info" });

          try {
            const res = await endSessionInstance(sessionInstanceId);
            if (res.error) {
              throw { message: res.message };
            }

            router.push("/dash");
          } catch (err: any) {
            toast(err.message, { type: "error" });
          }
        }
      }
    } catch (err: any) {
      toast(err.message, { type: "error" });
    }
  };

  useEffect(() => {
    return () => clearInterval(intervalId);
  }, []);

  const { data } = useQuery<SessionInstanceStateResponse, ErrorResponse>(
    ["getSessionInstanceDetails", sessionInstanceId],
    () => getSessionInstanceDetails(sessionInstanceId as string),
    {
      enabled: !!sessionInstanceId,
      onSettled: (data, error) => {
        if (error) {
          toast(error.message, { type: "error" });
        } else if (data) {
          const intervalId = setInterval(() => {
            setTimeSinceVal(
              timeSince(new Date(data.session_instance_details.start_timestamp))
            );
          }, 1000);
          setIntervalId(intervalId);
        }
      },
    }
  );

  let workouts = data?.session_workouts ?? [];

  return (
    <div className="relative">
      <MetaHead />
      <Navbar />
      <div className="p-2">
        <Menu>
          {({ open }) => (
            <div className=" mx-auto max-w-2xl w-full my-10 px-4">
              {/* We are only supporting WEIGHT_AND_REPS for now! */}
              {workouts.length ? (
                <>
                  <div className="ml-4">
                    <div className="inline-block mr-2">Schema name: </div>
                    <div className="inline-block font-bold">
                      {data ? data.session_instance_details.schema_name : null}
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="inline-block mr-2">Session started: </div>
                    <div className="inline-block font-bold">{timeSinceVal}</div>
                  </div>

                  <div className="ml-4">
                    <div className="inline-block mr-2">Current workout: </div>
                    <div className="inline-block font-bold">
                      {workoutIndex + 1}/{workouts.length}
                    </div>
                  </div>

                  <div className="ml-4 mt-2 mb-4">
                    <Menu.Button className="btn btn-sm text-secondary-content">
                      Workout List
                    </Menu.Button>
                    <Transition
                      show={open}
                      as={Fragment}
                      enter="transition ease-in-out duration-300 transform"
                      enterFrom="translate-x-full"
                      enterTo="translate-x-0"
                      leave="transition ease-in-out duration-300 transform"
                      leaveFrom="translate-x-0"
                      leaveTo="translate-x-full"
                    >
                      <Menu.Items
                        defaultValue={2}
                        as="ul"
                        className="z-50 absolute top-0 right-0 h-full w-full max-w-xs  overflow-auto bg-white py-14 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm flex flex-col rounded-xl bg-gradient-to-r from-amber-100 to-orange-100"
                        static
                      >
                        <Menu.Button className="absolute top-1 right-1 btn btn-ghost btn-square">
                          <XCircleIcon className="w-10" />
                        </Menu.Button>
                        <div className="font-black text-xl px-10">
                          Workout List
                        </div>
                        {/* bg-base-100  */}
                        {/* <ul className=> */}
                        <div className="font-bold px-4 pb-4 text-primary text-lg"></div>
                        {workouts &&
                          workouts.map((workout, index: number) => {
                            return (
                              <Menu.Item
                                as="li"
                                className={
                                  "relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900 hover:bg-amber-200 " +
                                  (index === workoutIndex ? "font-medium" : "")
                                }
                                key={index}
                                onClick={() => {
                                  setWorkoutIndex(index);
                                }}
                              >
                                {/* className= */}
                                {index === workoutIndex && (
                                  <TicketIcon className="w-8 absolute inset-y-1/4 left-0 flex items-center pl-3 text-amber-500" />
                                )}
                                <span>{workout.workout_name}</span>
                              </Menu.Item>
                            );
                          })}

                        {workouts.length == 0 && (
                          <li className="alert px-6 py-4">
                            {" "}
                            Loading Workouts...
                          </li>
                        )}

                        {/* </ul> */}
                      </Menu.Items>
                    </Transition>
                  </div>

                  <Formik
                    initialValues={{
                      sets_data: workouts[workoutIndex]
                        .current_workout_instance_sets_data ?? [
                        getInitialSetValue(
                          workouts[workoutIndex].workout_category
                        ),
                      ],
                    }}
                    onSubmit={handleAddOrModifyBlockSubmit}
                    enableReinitialize={true}
                  >
                    <Form>
                      <div>
                        <Card session_block_instance={workouts[workoutIndex]} />

                        <div className="col-span-6 flex justify-between mt-8 gap-3">
                          <button
                            disabled={workoutIndex === 0}
                            className="btn"
                            type="button"
                            onClick={handleBack}
                          >
                            <ChevronLeftIcon className="w-6" />
                          </button>
                          <button
                            disabled={isMutationResultLoading}
                            className="btn flex-grow space-x-1"
                            type="submit"
                          >
                            Next Workout
                            <ChevronRightIcon className="w-6" />
                          </button>
                        </div>
                      </div>
                    </Form>
                  </Formik>
                </>
              ) : (
                <div className="alert alert-info">Loading workouts...</div>
              )}
            </div>
          )}
        </Menu>
      </div>
    </div>
  );
};

const schema = yup.object().shape({
  sets: yup
    .array()
    .required()
    .min(1)
    .of(
      yup.object().shape({
        values: yup
          .array()
          .required()
          .min(1)
          .of(
            yup.object().shape({
              reps: yup.number().required().integer(),
              weight: yup.number().required(),
            })
          ),
      })
    ),
});

type sets_data_type = { values: TYPE_NAME_SOMETHING }[];

type TYPE_NAME_SOMETHING = { reps: number | string; weight: number | string }[];

const RenderFields = ({
  workoutCategory,
  idPrefix,
}: {
  idPrefix: string;
  workoutCategory: SessionInstanceStateResponse["session_workouts"][number]["workout_category"];
}) => {
  if (workoutCategory === "WEIGHT_AND_REPS") {
    return (
      <>
        <Field
          type="number"
          placeholder="Weight"
          className="input input-primary w-full input-sm"
          name={`${idPrefix}.weight`}
        />
        <Field
          type="number"
          placeholder="Reps"
          className="input input-primary w-full input-sm"
          name={`${idPrefix}.reps`}
        />
      </>
    );
  } else if (workoutCategory === "DISTANCE_AND_DURATION") {
    return (
      <>
        <Field
          type="number"
          placeholder="Distance (in KMs)"
          className="input input-primary w-full input-sm"
          name={`${idPrefix}.distance`}
        />
        <Field
          type="number"
          placeholder="Duration (in Minutes)"
          className="input input-primary w-full input-sm"
          name={`${idPrefix}.duration`}
        />
      </>
    );
  } else if (workoutCategory === "DURATION") {
    return (
      <Field
        type="number"
        placeholder="Duration (in Minutes)"
        className="input input-primary w-full input-sm"
        name={`${idPrefix}.duration`}
      />
    );
  } else if (workoutCategory === "REPS") {
    return (
      <Field
        type="number"
        placeholder="Reps"
        className="input input-primary w-full input-sm"
        name={`${idPrefix}.reps`}
      />
    );
  } else {
    return null;
  }
};

const RenderDataByWorkoutCategory = ({
  workoutCategory,
  lastSessionSetInfo,
}: {
  lastSessionSetInfo: SessionInstanceState_SetData["values"][number];
  workoutCategory: SessionInstanceStateResponse["session_workouts"][number]["workout_category"];
}) => {
  if ("weight" in lastSessionSetInfo) {
    return (
      <>
        <div className="inline-block">{lastSessionSetInfo.weight} kgs</div>
        <div className="inline-block mx-1 ">/</div>
        <div className="inline-block">{lastSessionSetInfo.reps} reps</div>
      </>
    );
  } else if ("reps" in lastSessionSetInfo) {
    return (
      <>
        <div className="inline-block">{lastSessionSetInfo.reps} reps</div>
      </>
    );
  } else if ("distance" in lastSessionSetInfo) {
    return (
      <>
        <div className="inline-block">{lastSessionSetInfo.distance} KMs</div>
        <div className="inline-block mx-1 ">/</div>
        <div className="inline-block">
          {lastSessionSetInfo.duration} minutes
        </div>
      </>
    );
  } else if ("duration" in lastSessionSetInfo) {
    return (
      <>
        <div className="inline-block">
          {lastSessionSetInfo.duration} minutes
        </div>
      </>
    );
  } else {
    return null;
  }
};

const Card = ({
  session_block_instance,
}: {
  session_block_instance: SessionInstanceStateResponse["session_workouts"][number];
}) => {
  const {
    superset_schema_name,
    type,
    default_target,
    workout_name,
    workout_category,
    prev_workout_instance_sets_data,
    current_workout_instance_sets_data,
    workout_image_url,
  } = session_block_instance;

  const { values } = useFormikContext<{
    sets_data: sets_data_type;
  }>();

  return (
    <div className="z-10">
      <div className="card py-4 bg-gray-200  shadow-xl">
        <figure>
          <Image
            src={workout_image_url}
            className="select-none h-72 w-72 object-cover pointer-events-none mask mask-squircle"
            alt="Shoes"
          />
        </figure>

        <div className="px-4 py-2">
          <div className="mb-3">
            <h2 className="card-title">{workout_name}</h2>
            <h3 className="">
              {type === "SUPERSET_WORKOUT"
                ? `Superset: ${superset_schema_name}`
                : null}
            </h3>
          </div>

          <div>
            <FieldArray
              name="sets_data"
              render={(setsArrayHelpers) => (
                <div className="grid grid-cols-6 text-sm items-center justify-center">
                  {/* PRINT THE FIRST ONE */}

                  {values.sets_data.map((set, setIndx) => {
                    const setData = prev_workout_instance_sets_data
                      ? prev_workout_instance_sets_data[setIndx]
                      : null;
                    // we are taking instance 0 always;

                    const lastSessionSetInfo =
                      setData && setData.values ? setData.values[0] : null;

                    // TODO: based on the category show values

                    return (
                      <Fragment key={setIndx}>
                        <div
                          key={"last_session_one_" + setIndx}
                          className="col-span-6 mt-2"
                        >
                          <DescriptionText
                            type="gap-2"
                            name="Last session:"
                            value={
                              <>
                                {lastSessionSetInfo ? (
                                  <>
                                    <RenderDataByWorkoutCategory
                                      workoutCategory={workout_category}
                                      lastSessionSetInfo={lastSessionSetInfo}
                                    />
                                  </>
                                ) : (
                                  "No data"
                                )}
                              </>
                            }
                          />
                        </div>

                        <div
                          key={"last_session_two_" + setIndx}
                          className="col-span-6 mt-2"
                        >
                          <DescriptionText
                            type="gap-2"
                            name="Target:"
                            value={default_target[setIndx] ?? "None"}
                          />
                        </div>

                        <FieldArray
                          name={`sets_data.${setIndx}.values`}
                          key={"field_array_aa_" + setIndx}
                          render={(arrayHelpers) => {
                            return (
                              <>
                                <div className="col-span-6 mt-2 flex flex-row flex-grow gap-2 items-center">
                                  <RenderFields
                                    idPrefix={`sets_data.${setIndx}.values[0]`}
                                    workoutCategory={workout_category}
                                  />
                                </div>

                                {values.sets_data[setIndx].values.map(
                                  (e, valueIndx) => {
                                    return (
                                      <Fragment key={valueIndx}>
                                        {valueIndx ? (
                                          <>
                                            {/* DROP SET BEGIN */}
                                            <div
                                              key={
                                                "last_session__values" +
                                                setIndx +
                                                valueIndx
                                              }
                                              className="col-start-1  col-span-1 mr-1 ml-2"
                                            >
                                              <Image
                                                src={require("../../public/assets/arrow.svg")}
                                              />
                                            </div>

                                            <div
                                              key={
                                                "last_session__values11" +
                                                setIndx +
                                                valueIndx
                                              }
                                              className="col-start-2 col-span-5  mt-2 flex flex-row flex-grow gap-2 items-center"
                                            >
                                              <RenderFields
                                                idPrefix={`sets_data.${setIndx}.values.${valueIndx}`}
                                                workoutCategory={
                                                  workout_category
                                                }
                                              />
                                            </div>

                                            {/* DROP SET END */}
                                          </>
                                        ) : null}
                                      </Fragment>
                                    );
                                  }
                                )}

                                {workout_category === "WEIGHT_AND_REPS" ? (
                                  // drop sets are only for this category
                                  <button
                                    onClick={() => {
                                      arrayHelpers.push({
                                        reps: "",
                                        weight: "",
                                      });
                                    }} // insert an empty string at a position
                                    type="button"
                                    className="col-start-4 col-span-3 sm:col-start-5 sm:col-span-2 mt-2 mb-5 btn btn-xs text-xss"
                                  >
                                    + Drop set
                                  </button>
                                ) : null}
                              </>
                            );
                          }}
                        />
                      </Fragment>
                    );
                  })}

                  <button
                    onClick={() => {
                      setsArrayHelpers.push(
                        getInitialSetValue(workout_category)
                      );
                    }}
                    type="button"
                    className="btn col-start-3 col-span-4 btn-sm mt-4 flex-1"
                  >
                    New set
                  </button>
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuthHOC(SessionInstance);
