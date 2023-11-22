import { forwardRef } from "react";

interface Props {
  children: React.ReactNode;
}

type Ref = HTMLDialogElement;

const Dialog = forwardRef<Ref, Props>(function Dialog({ children }, ref) {
  return (
    <dialog className="modal" ref={ref}>
      <div className="modal-box flex max-w-lg flex-col gap-4 overflow-auto">
        <form method="dialog" className="absolute right-2 top-2">
          <button className="btn-ghost btn-sm btn-circle btn">✕</button>
        </form>
        {children}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
});

export default Dialog;
