import { useRouter } from "next/router";
import React from "react";
import { useGetCurrentUserQuery } from "../api";

export const witNoAuthHOC = (WrappedComponent: any): React.FC<any> => {
  return () => {
    const { isLoading, isError, error, data } = useGetCurrentUserQuery();
    const router = useRouter();

    if (isLoading) {
      return null;
    } else if (isError) {
      return (
        <div className="alert alert-error">
          Something went terribly wrong: {error.message}
        </div>
      );
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
