import Router from "next/router";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { logOutUser } from "../../api";



const LogOut = () => {

    const { data, isLoading } = useQuery('logOutUser', logOutUser, {
        onSettled: (data) => {
            if (data?.error) toast(data.message, { type: 'error' })
            else toast(data?.message, { type: 'success' })

            Router.push('/')
        }
    });

    return (
        null
    )
}

export default LogOut;
