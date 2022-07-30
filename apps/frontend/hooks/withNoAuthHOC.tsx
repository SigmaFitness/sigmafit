import { useRouter } from "next/router";
import React from "react";
import { useGetCurrentUserQuery } from "../api";
import { ErrorScreen } from "../components/ErrorScreen";
import { Navbar } from "../components/Navbar";

export const witNoAuthHOC = (WrappedComponent: any): React.FC<any> => {
  return () => {
    const { isLoading, isError, error, data } = useGetCurrentUserQuery();
    const router = useRouter();

    if (isLoading) {
      return null;
    } else if (isError) {
      return <ErrorScreen message={error?.message} />;
    } else {
      if (data?.is_logged_in) {
        // user logged in
        router.push("/dash");
      } else {
        return <WrappedComponent />;
      }
      return null;
    }
  };
};
