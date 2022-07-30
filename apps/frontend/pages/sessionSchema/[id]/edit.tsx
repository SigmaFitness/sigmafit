import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { ErrorResponse, getSessionSchemaDetails } from "../../../api";
import { MetaHead } from "../../../components/Head";
import { Navbar } from "../../../components/Navbar";
import SessionSchemaForm, {
  SessionSchemaFormValueType,
} from "../../../components/Forms/SessionSchemaForm";
import { SessionSchemaDetailsResponse } from "@sigmafit/commons";
import { withAuthHOC } from "../../../hooks/withAuthHOC";

// TODO: Currently we're using it as a way to show the data; editing is not allowed for now
const SessionSchemaEdit = () => {
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

  const handleSubmit = (payload: SessionSchemaFormValueType) => {
    toast("Editing form is currently disabled..", { type: "error" });
  };

  return (
    <div>
      <MetaHead />

      <Navbar />

      <div className="px-3 my-10">
        {isLoading || !data ? (
          <div className="alert alert-info max-w-2xl mx-auto">Loading...</div>
        ) : (
          <SessionSchemaForm
            heading="Edit Session Schema"
            initialValues={data}
            handleSubmit={handleSubmit}
            waitingForServerResponse={false}
          />
        )}
      </div>
    </div>
  );
};

export default withAuthHOC(SessionSchemaEdit);
