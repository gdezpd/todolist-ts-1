export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'succeeded' as RequestStatusType,
    error: null as string | null

}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {

        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppReducerAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const)
export const setErrorAC = (error: null | string) => ({type: "APP/SET-ERROR", error} as const)
export type SetAppActionType = ReturnType<typeof setAppReducerAC>;
export type SetErrorActionType = ReturnType<typeof setErrorAC>;

export type AppActionsType = SetAppActionType | SetErrorActionType