import { useRouter } from "next/router"
import React, { PropsWithChildren } from "react"
import { useQuery } from "react-query"
import { useGetCurrentUserQuery } from "../api"



export const useWithAuth = (WrappedComponent: any) => {

    return () => {
        const { isLoading, isError, error } = useGetCurrentUserQuery()
        const router=useRouter()

        if (isLoading) {
            return <div>Loading....</div>
        } else if (isError) {
            if(error.status===401) router.push('/auth/signin')
            return null;
        } else {
            return (
                <WrappedComponent />
            )
        }
    }
}
