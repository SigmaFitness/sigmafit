import axios from "axios"
import { useQuery } from "react-query"
import { SessionSchemaVoteRequest, SessionSchema_SubmitForReview_Request, SessionSchema_Top_Request, WorkoutListResponse } from '@sigmafit/commons'

const apiPrefixSlug = '/api'


export type ErrorResponse = {
    error: true,
    message: string,
    status: number
}

const usePost = async <T>(url: string, method: 'GET' | 'POST', data?: any): Promise<T> => {
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


// WORKOUT

export const getAllWorkouts = async () => {
    return usePost<WorkoutListResponse>(`${apiPrefixSlug}/workout/list`, 'GET')
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
// DONE
export const getAllActiveSessions = async () => {
    return usePost<any>(`${apiPrefixSlug}/sessionInstance/allActive`, 'GET')
}


/**
 * Get all schema owned by the user
 */
export const getAllSessionSchemaOwnedByUser = async () => {
    return usePost<any>(`${apiPrefixSlug}/sessionSchema/all`, 'GET')
}


/**
 * Start a new session from schema Id
 */
export const startANewSessionFromSchemaId = async (sessionSchemaId: string) => {
    return usePost<any>(`${apiPrefixSlug}/sessionInstance/start`, 'POST', { sessionSchemaId })
}







export const addNewSessionSchema = async (sessionSchema: any) => {
    return usePost<any>(`${apiPrefixSlug}/sessionSchema/create`, 'POST', sessionSchema)
}


export const getSessionSchemaDetails = async (schemaId: string) => {
    return usePost<any>(`${apiPrefixSlug}/sessionSchema/details/${schemaId}`, 'GET')
}


export const getSessionInstanceDetails = async (schemaInstanceId: string) => {
    return usePost<any>(`${apiPrefixSlug}/sessionInstance/state/${schemaInstanceId}`, 'GET')
}


const getCurrentUser = async () => {
    return usePost<any>(`${apiPrefixSlug}/auth/currentUser`, 'GET')
}

export const useGetCurrentUserQuery = () => useQuery<any, ErrorResponse>('getCurrentUser', getCurrentUser, {
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



export const changeStateOfSessionSchema = async (payload: SessionSchema_SubmitForReview_Request) => {
    return usePost<any>(`${apiPrefixSlug}/sessionSchema/submit_for_review`, 'POST', payload)
}


export const getTopSessionSchema = async (pageState: SessionSchema_Top_Request) => {
    return usePost<any>(`${apiPrefixSlug}/sessionSchema/top`, 'POST', pageState)
}


export const voteASessionSchema = async (payload: SessionSchemaVoteRequest) => {
    return usePost<any>(`${apiPrefixSlug}/sessionSchema/vote/`, 'POST', payload)
}

