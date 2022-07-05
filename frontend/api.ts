import axios from "axios"
import { useQuery } from "react-query"


const apiPrefixSlug = '/api'


export type ErrorResponse = {
    error: true,
    message: string,
    status: number
}

export type ApiResponse<T> = (
    {
        error: false,
    } & T
)

const usePost = async <T>(url: string, method: 'GET' | 'POST', data?: any): Promise<ApiResponse<T>> => {
    try {
        const response = await axios(url, {
            data,
            method,
            withCredentials: true
        })
        return response.data
    } catch (err: any) {
        throw {
            error: true,
            message: err.response.data.message ?? err.message,
            status: err.response.status
        }
    }
}

/**
 * Signup the user
 */
export const signUpUserMutation = async (userData: any) => {
    return usePost<any>(`${apiPrefixSlug}/auth/signUp`, 'POST', userData)
}



/**
 * Signin the user
 */
export const signInUserMutation = async (userData: any) => {
    return usePost<any>(`${apiPrefixSlug}/auth/signIn`, 'POST', userData)
}




/**
 * Get all active sessions for the user
 */
export const getAllActiveSessions = async () => {
    return usePost<any>(`${apiPrefixSlug}/sessionInstance/allActive`, 'GET')
}


/**
 * Get all schema owned by the user
 */
export const getAllSchemasOwnedByUser = async () => {
    return usePost<any>(`${apiPrefixSlug}/sessionSchema/all`, 'GET')
}


/**
 * Start a new session from schema Id
 */
export const startANewSessionFromSchemaId = async (sessionSchemaId: string) => {
    return usePost<any>(`${apiPrefixSlug}/sessionInstance/start`, 'POST', { sessionSchemaId })
}



export const getAllWorkouts = async () => {
    return usePost<any>(`${apiPrefixSlug}/workout/list`, 'GET')
}



export const addNewWorkoutMutation = async (newWorkoutData: any) => {
    const newObj: any = {}
    Object.keys(newWorkoutData).forEach(e => {
        if (newWorkoutData[e]) newObj[e] = newWorkoutData[e]
    })
    return usePost<any>(`${apiPrefixSlug}/workout/add`, 'POST', newObj)
}


export const getNewWorkoutAddFormOptions = async () => {
    return usePost<any>(`${apiPrefixSlug}/workout/formOptions`, 'GET')
}




export const addNewSessionSchema = async (sessionSchema: any) => {
    return usePost<any>(`${apiPrefixSlug}/sessionSchema/create`, 'POST', sessionSchema)
}


export const getSessionSchemaDetails = async (schemaId: string) => {
    return usePost<any>(`${apiPrefixSlug}/sessionSchema/details/${schemaId}`, 'GET')
}


export const getSessionInstanceDetails = async (schemaInstanceId: string) => {
    return usePost<{
        error: boolean,
        superset_schema_details: any,
        workouts: any,
        session_instance_details: {
            end_timestamp: string,
            start_timestamp: string,
            schema_name: string,
        }
    }>(`${apiPrefixSlug}/sessionInstance/state/${schemaInstanceId}`, 'GET')
}


const getCurrentUser = async () => {
    return usePost<any>(`${apiPrefixSlug}/auth/currentUser`, 'GET')
}

export const useGetCurrentUserQuery = () => useQuery<ApiResponse<unknown>, ErrorResponse>('getCurrentUser', getCurrentUser, {
    retry: false
})


export const logOutUser = async () => {
    return usePost<any>(`${apiPrefixSlug}/auth/logOut`, 'GET')
}

export const sessionInstanceAddOrModifyBlock = async (payload: any) => {
    return usePost<any>(`${apiPrefixSlug}/sessionInstance/addOrModifyBlock`, 'POST', payload)
}

export const endSessionInstance = async (activeSessionInstanceId: any) => {
    return usePost<any>(`${apiPrefixSlug}/sessionInstance/end`, 'POST', {
        activeSessionInstanceId
    })
}


