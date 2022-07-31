import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import {
  addNewSessionSchema,
  ErrorResponse,
  getSessionSchemaDetails,
} from "../../../api";
import { MetaHead } from "../../../components/Head";
import { Navbar } from "../../../components/Navbar";
import SessionSchemaForm, {
  SessionSchemaFormValueType,
} from "../../../components/Forms/SessionSchemaForm";
import {
  SessionSchemaCreateRequest,
  SessionSchemaCreateResponse,
  SessionSchemaDetailsResponse,
} from "@sigmafit/commons";
import { withAuthHOC } from "../../../hooks/withAuthHOC";
import { Footer } from "../../../components/Footer";

const SessionSchemaClone = () => {
  const router = useRouter();
  const { id } = router.query;

  const { isLoading, data } = useQuery<
    SessionSchemaDetailsResponse,
    ErrorResponse
  >(
    ["getSessionSchemaDetails", id],
    () => getSessionSchemaDetails(id as string),
    {
      enabled: !!id,
      onSettled: (data, error) => {
        if (error) toast(error.message, { type: "error" });
      },
    }
  );

  const { mutate } = useMutation<
    SessionSchemaCreateResponse,
    ErrorResponse,
    SessionSchemaCreateRequest
  >("addNewSessionSchema", addNewSessionSchema, {
    onSettled(data, error) {
      if (error) {
        toast(error.message, { type: "error" });
      } else if (data) {
        toast("successfully cloned the workout routine");
        router.push("/dash");
      }
    },
  });

  const handleSubmit = (payload: SessionSchemaFormValueType) => {
    mutate({
      session_name: payload.session_name,
      schema_blocks: payload.schema_blocks.map((block, indx) => {
        if ("workout_id" in block) {
          return { ...block, order: indx };
        } else {
          return {
            ...block,
            superset_workout_schema: block.superset_workout_schema.map(
              (workout, indx) => {
                return { ...workout, order: indx };
              }
            ),
            order: indx,
          };
        }
      }),
    });
  };

  return (
    <div>
      <MetaHead />
      <div className="flex flex-col min-h-screen">

        <Navbar />

        <div className="px-3 my-10 mb-auto">
          {isLoading || !data ? (
            <div className="alert alert-info max-w-2xl mx-auto">Loading...</div>
          ) : (
            <SessionSchemaForm
              heading="Clone Workout Routine"
              initialValues={data}
              handleSubmit={handleSubmit}
              waitingForServerResponse={false}
            />
          )}
        </div>
        <Footer />

      </div>
    </div>

  );
};

export default withAuthHOC(SessionSchemaClone);
