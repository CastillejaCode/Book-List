import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { motion } from "framer-motion";

const Error = () => {
  const { error, notif } = useSelector((state: RootState) => {
    // Parses error message from API error code
    // Remove the first word "Error/", remove the "-", then rejoin
    const error = state.notification.error
      .split("/")
      .slice(1)
      .at(0)
      ?.split("-")
      .join(" ");
    return {
      error,
      notif: state.notification.notif,
    };
  });

  return (
    <motion.p
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      style={{ x: "-50%" }}
      className={`absolute left-1/2 top-0 whitespace-nowrap rounded-l bg-red-300 p-4 text-2xl
      ${error && "bg-red-300"}
      ${notif && "bg-green-300"}
      `}
    >
      {error || notif}
    </motion.p>
  );
};

export default Error;
