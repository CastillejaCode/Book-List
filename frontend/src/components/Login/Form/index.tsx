import { motion } from "framer-motion";
const Form = ({ children }) => {
  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      className="fixed top-1/4 flex flex-col items-center rounded-lg border-2 border-slate-600/80 bg-gray-50 p-8  shadow-lg"
    >
      {children}
    </motion.div>
  );
};

export default Form;
