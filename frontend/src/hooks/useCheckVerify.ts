import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../auth/config";
import { useDispatch } from "react-redux";
import { setToast } from "../features/notificationSlice";
import { setVerification } from "../features/userSlice";

const useCheckVerify = () => {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  let id: number;

  const start = () => {
    id = setInterval(async () => {
      await user?.reload();
      if (user?.emailVerified) {
        clearInterval(id);
        dispatch(setToast("email verified"));
        dispatch(setVerification(true));
      }
    });
  };

  const stop = () => {
    clearInterval(id);
  };

  return { start, stop };
};

export default useCheckVerify;
