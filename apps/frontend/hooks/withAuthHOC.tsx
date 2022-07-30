import { useRouter } from "next/router";
import React, { PropsWithChildren } from "react";
import { useQuery } from "react-query";
import { useGetCurrentUserQuery } from "../api";

export const withAuthHOC = (WrappedComponent: any): React.FC<any> => {
  return () => {
    const { isLoading, isError, error, data } = useGetCurrentUserQuery();
    const router = useRouter();

    if (isLoading) {
      // return <div className="alert justify-center my-96">Loading....</div>;
      return null;
    } else if (data?.is_logged_in) {
      return <WrappedComponent />;
    } else {
      router.push("/");
      return null;
    }
  };
};
