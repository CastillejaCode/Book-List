import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { motion } from "framer-motion";

const Error = () => {
  const error = useSelector((state: RootState) => {
    const error = state.error.value;
    if (!error) return;
    return error.split("/").slice(1).at(0)?.split("-").join(" ");
  });

  return (
    <motion.p
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      style={{ x: "-50%" }}
      className="absolute left-1/2 top-0 whitespace-nowrap rounded-lg bg-red-300 p-4 text-2xl"
    >
      {error}
    </motion.p>
  );
};

export default Error;
