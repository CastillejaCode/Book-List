import Form from "./Form";
import { Dialog } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { toggleModal } from "../../features/toggleSlice";

const Modal = () => {
  const dispatch = useDispatch();
  const showModal = useSelector((state: RootState) => state.toggle.modal);
  return (
    <Dialog open={showModal} onClose={() => dispatch(toggleModal())}>
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 ">
        <Dialog.Panel className="relative w-fit rounded-md border-2 border-gray-700 bg-gray-50 shadow-lg ">
          <XCircleIcon
            className=" absolute right-0 top-0 m-1 h-5 w-5 text-slate-700"
            onClick={() => dispatch(toggleModal())}
          />
          <Form toggleOpen={() => dispatch(toggleModal())} />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default Modal;
