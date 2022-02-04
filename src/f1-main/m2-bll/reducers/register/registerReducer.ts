const initState: InitStateType = {}

export const registerReducer = (state = initState, action: ActionType): InitStateType => {
    switch(action.type) {

        default: return state
    }
}

// Types

type ActionType = any

type InitStateType = any