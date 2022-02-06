import { useDispatch, useSelector } from "react-redux";
import { RootAppStateType } from "../../../../m2-bll/store";
import { Snackbar } from "../snackbar/Snackbar";
import { errorMessageAC } from "../../../../m2-bll/reducers/appReducer/appReducer";

export const ErrorSnackbar = () => {
  const error = useSelector<RootAppStateType, string | null>(
    (state) => state.app.errorMessage
  );
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(errorMessageAC(null));
  };

  return (
    <Snackbar
      open={error !== null}
      autoHideDuration={3000}
      onClose={handleClose}
      error={error ? error : ""}
    />
  );
};
