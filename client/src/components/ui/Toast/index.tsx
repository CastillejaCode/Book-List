import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetToast } from "src/slices/toastSlice";
import { RootState } from "src/store";

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

  const limit = 50;

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          drag="x"
          dragConstraints={{ left: limit, right: limit }}
          whileDrag={{ opacity: 0.5 }}
          onDragEnd={(_event, info) =>
            Math.abs(info.offset.x) > limit && dispatch(resetToast())
          }
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          exit={{ opacity: 0 }}
          className={clsx(
            "toast-end toast m-4 flex w-fit -translate-x-1/2 flex-row rounded-lg pl-8 pr-10 shadow-xl ",
            style[type]
          )}
        >
          <p>{message}</p>
          <button
            className="btn-ghost btn-sm btn-circle btn absolute right-0 top-0 "
            onClick={() => dispatch(resetToast())}
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
