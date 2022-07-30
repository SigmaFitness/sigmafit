import { useRouter } from "next/router";
import React, { PropsWithChildren } from "react";
import { useQuery } from "react-query";
import { useGetCurrentUserQuery } from "../api";
import { ErrorScreen } from "../components/ErrorScreen";

export const withAuthHOC = (WrappedComponent: any): React.FC<any> => {
  return () => {
    const { isLoading, isError, error, data } = useGetCurrentUserQuery();
    const router = useRouter();

    if (isLoading) {
      return null;
    } else if (isError) {
      return <ErrorScreen message={error?.message} />
    } else if (data?.is_logged_in) {
      return <WrappedComponent />;
    } else {
      router.push("/");
      return null;
    }
  };
};
