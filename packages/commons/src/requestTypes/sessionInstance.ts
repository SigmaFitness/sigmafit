import { SessionInstanceState_SetData } from "../responseTypes/sessionInstance"
import { body_part, intensity_levels, workout, workout_type } from "../prismaGenTypes"




export type SessionInstanceAddOrModifyBlockRequest = {
    block_type: "CLASSIC_WORKOUT" | "SUPERSET_WORKOUT"
    id: string
    session_instance_id: string
    sets_data: SessionInstanceState_SetData[]
}
