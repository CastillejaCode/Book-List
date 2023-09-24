import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetToast } from "../slices/notificationSlice";
import { RootState } from "../store";

const Toast = () => {
  const dispatch = useDispatch();
  const toast = useSelector((state: RootState) => state.notification.toast);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(resetToast());
    }, 5000);
    return () => clearTimeout(timeout);
  }, [dispatch, toast]);

  if (toast)
    return (
      <div
        className={`fixed bottom-6 right-6 rounded-lg border-2 border-gray-800 px-2 py-4 shadow-xl transition-all duration-300`}
      >
        <p>{toast}</p>
      </div>
    );
  else return <></>;
};

export default Toast;
