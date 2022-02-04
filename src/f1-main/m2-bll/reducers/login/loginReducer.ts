const initState: InitStateType = {}

export const loginReducer = (state = initState, action: ActionTypes ): InitStateType => {
    switch(action.type) {

        default: return state
    }
}

// Types

type ActionTypes = any

type InitStateType = any