import Form from "../features/books/components/AddForm";
import { Dialog } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { toggleModal } from "../slices/toggleSlice";

const Modal = () => {
  const dispatch = useDispatch();
  const showModal = useSelector((state: RootState) => state.toggle.modal);
  return (
    <Dialog open={showModal} onClose={() => dispatch(toggleModal())}>
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-8">
        <Dialog.Panel className="relative w-full max-w-md  rounded-md border-2 border-gray-700 bg-gray-50 shadow-lg">
          <button
            className="absolute right-0 top-0 m-2"
            onClick={() => dispatch(toggleModal())}
            aria-label="Close form"
          >
            <XCircleIcon className=" h-7 text-red-900" />
          </button>
          <Form toggleOpen={() => dispatch(toggleModal())} />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default Modal;
