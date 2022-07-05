import Router from "next/router";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { ErrorResponse, logOutUser } from "../../api";



const LogOut = () => {

    const { data, isLoading } = useQuery('logOutUser', logOutUser, {
        onSettled: (data, error: ErrorResponse | null) => {
            if (error) toast(error.message, { type: 'error' })
            else toast(data?.message, { type: 'success' })

            Router.push('/')
        }
    });

    return (
        null
    )
}

export default LogOut;
