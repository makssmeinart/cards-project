const initState: InitStateTypes = {};

export const newPassword = (
  state = initState,
  action: ActionTypes
): InitStateTypes => {
  switch (action.type) {
    default:
      return state;
  }
};

// Types

type ActionTypes = any;

type InitStateTypes = any;
