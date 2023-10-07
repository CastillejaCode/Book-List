import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetToast } from "../slices/notificationSlice";
import { RootState } from "../store";

const Toast = () => {
  const dispatch = useDispatch();
  const toast = useSelector((state: RootState) => state.notification);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(resetToast());
    }, 5000);
    return () => clearTimeout(timeout);
  }, [dispatch, toast]);

  if (!toast.message) return <></>;
  return (
    <div
      className={`toast fixed bottom-8 left-1/2 w-fit -translate-x-1/2 rounded-lg bg-zinc-100 px-6 py-4 shadow-xl transition-all duration-300 dark:bg-zinc-800`}
    >
      {toast.message}
    </div>
  );
};

export default Toast;
