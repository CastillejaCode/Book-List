import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { FirebaseError } from "firebase/app";
import useToast from "src/hooks/useToast";
import { useUpdateBookMutation } from "src/services/books";

interface Props {
  coverNumber: number;
  id: string;
}

export default function CoverControls({ coverNumber, id }: Props) {
  const { addToast } = useToast();
  const [updateBook] = useUpdateBookMutation();

  const range = [0, 9];
  const switchNext = async (next: boolean) => {
    try {
      // Stop if outside range
      if (next && coverNumber >= range[1]) return;
      if (!next && coverNumber <= range[0]) return;

      const body = { coverNumber: coverNumber + (next ? 1 : -1) };
      updateBook({ id, body });
    } catch (error) {
      if (!(error instanceof FirebaseError)) return;
      const { message } = error;
      addToast({ type: "error", message });
    }
  };
  return (
    <div className=" flex justify-center gap-4">
      <button
        aria-label="Previous cover"
        onClick={() => switchNext(false)}
        className={clsx("w-6", coverNumber === range[0] && "invisible")}
      >
        <ChevronLeftIcon />
      </button>
      <div className="grid place-content-center text-center text-xl">
        {coverNumber + 1} / {range[1] + 1}
      </div>
      <button
        aria-label="Next cover"
        onClick={() => switchNext(true)}
        className={clsx("w-6", coverNumber === range[1] && "invisible")}
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
}
