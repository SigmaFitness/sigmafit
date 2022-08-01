import Router from "next/router";
import { useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { ErrorResponse, logOutUser } from "../../api";

const LogOut = () => {
  const queryClient = useQueryClient();

  useQuery("logOutUser", logOutUser, {
    onSettled: (data, error: ErrorResponse | null) => {
      if (error) toast(error.message, { type: "error" });
      else toast(data?.message, { type: "success" });

      queryClient.refetchQueries("getCurrentUser");

      Router.push("/");
    },
  });

  return null;
};

export default LogOut;
