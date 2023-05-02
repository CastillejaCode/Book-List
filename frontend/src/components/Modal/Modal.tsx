import Form from "./Form";
import { Dialog } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion";

interface Props {
  isOpen: boolean;
  setIsOpen: (param: boolean) => void;
}

const Modal = ({ isOpen, setIsOpen }: Props) => {
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <motion.div intial={{ scale: 0 }} animate={{ scale: 1 }}>
      <Dialog open={isOpen} onClose={() => setIsOpen(true)}>
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4 ">
          <Dialog.Panel className="relative w-fit rounded-md border-2 border-gray-700 bg-gray-50 shadow-lg ">
            <XCircleIcon
              className=" absolute right-0 top-0 m-1 h-5 w-5 text-slate-700"
              onClick={() => setIsOpen(false)}
            />
            <Form toggleOpen={toggleOpen} />
          </Dialog.Panel>
        </div>
      </Dialog>
    </motion.div>
  );
};

export default Modal;
