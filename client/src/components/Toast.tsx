import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetToast } from "../slices/toastSlice";
import { RootState } from "../store";
import clsx from "clsx";

const Toast = () => {
  const dispatch = useDispatch();
  const { message, type } = useSelector(
    (state: RootState) => state.notification
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(resetToast());
    }, 5000);
    return () => clearTimeout(timeout);
  }, [dispatch, message]);

  const style = {
    notification: "bg-zinc-100 dark:bg-zinc-800",
    error: "bg-red-700 dark:bg-red-900 text-red-200",
  };

  if (!message) return <></>;
  return (
    <div
      className={clsx(
        "toast fixed bottom-8 left-1/2 flex w-fit -translate-x-1/2 flex-row gap-6 rounded-lg px-6 py-4 font-semibold shadow-xl ",
        style[type]
      )}
    >
      <p>{message}</p>
      <button onClick={() => dispatch(resetToast())}>X</button>
    </div>
  );
};

export default Toast;
