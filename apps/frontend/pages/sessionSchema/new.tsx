import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { addNewSessionSchema, ErrorResponse } from "../../api";
import { MetaHead } from "../../components/Head";
import { Navbar } from "../../components/Navbar";
import SessionSchemaForm, {
  SessionSchemaFormValueType,
} from "../../components/Forms/SessionSchemaForm";
import { SessionSchemaCreateRequest } from "@sigmafit/commons";
import { withAuthHOC } from "../../hooks/withAuthHOC";
import { Footer } from "../../components/Footer";

const AddSessionSchema = () => {
  const {
    isLoading: waitingForServerResponse,
    mutate,
    error,
    data,
  } = useMutation<any, ErrorResponse, SessionSchemaCreateRequest>(
    addNewSessionSchema
  );
  const router = useRouter();

  const handleSubmit = (values: SessionSchemaFormValueType) => {
    mutate(
      {
        session_name: values.session_name,
        schema_blocks: values.schema_blocks.map((block, indx) => {
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
      },
      {
        onSettled(data, error, variables, context) {
          if (error) {
            toast(error.message, {
              type: "error",
            });
          } else {
            toast("Workout Routine added successfully.", {
              type: "success",
            });
            router.push("/dash");
            // TODO: refetch all sessions
          }
        },
      }
    );
  };

  return (
    <div>
      <MetaHead />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="mb-auto">
          <SessionSchemaForm
            heading="Build New Workout Routine"
            initialValues={{
              schema_blocks: [],
              session_name: "",
            }}
            handleSubmit={handleSubmit}
            waitingForServerResponse={waitingForServerResponse}
          />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default withAuthHOC(AddSessionSchema);
