import React, { FormEvent, SetStateAction, useEffect, useRef } from "react";

interface Props {
  visible: boolean;
  setVisible: React.Dispatch<SetStateAction<boolean>>;
  confirmAction: () => void;
}

// TODO: Add error handling

export default function ConfirmChoice({
  visible,
  setVisible,
  confirmAction,
}: Props) {
  const choiceRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (visible) choiceRef.current?.showModal();
    else choiceRef.current?.close();
  }, [visible]);

  const submitForm = (event: FormEvent) => {
    event.preventDefault();
    confirmAction();
    setVisible(false);
  };

  return (
    <dialog id="my_modal_2" className="modal " ref={choiceRef}>
      <div className="modal-box flex flex-col items-center gap-8">
        <div className="text-center">
          <h1 className="text-2xl">Are you sure?</h1>
          <h2 className="text-lg font-light">This action cannot be undone.</h2>
        </div>
        <form
          className="flex flex-col justify-between gap-4 sm:flex-row"
          onSubmit={submitForm}
        >
          <button type="submit" className="btn-warning btn">
            Yes, please Delete
          </button>
          <button
            type="button"
            className="btn-error btn"
            onClick={() => setVisible(false)}
          >
            No, go back
          </button>
        </form>
      </div>
      <form
        method="dialog"
        className="modal-backdrop"
        onSubmit={() => setVisible(false)}
      >
        <button>close</button>
      </form>
    </dialog>
  );
}
