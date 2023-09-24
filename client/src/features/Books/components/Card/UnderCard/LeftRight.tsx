import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useUpdateBookMutation } from "../../../../../services/books";
import { Docs } from "../../../../../types";
interface Props {
  id: string;
  coverNumber: number;
  docs: Docs;
}

export default function LeftRight({ id, coverNumber, docs }: Props) {
  const [updateBook] = useUpdateBookMutation();

  if (!docs) return <div>Loading...</div>;
  const length = docs.length > 5 ? 9 : docs.length - 1;

  const number = (condition: "next" | "prev") => {
    let value = coverNumber;
    if (condition === "next") value += 1;
    if (condition === "prev") value -= 1;

    if (value < 0 || value > length) return;
    const body = { coverNumber: value };

    updateBook({ id, body });
  };

  return (
    <div className=" flex justify-center gap-4">
      <ChevronLeftIcon
        className="aspect-square w-10"
        onClick={() => number("prev")}
      />
      <div className="grid place-content-center text-center text-xl">
        {coverNumber + 1} / {length + 1}
      </div>
      <ChevronRightIcon
        className="aspect-square w-10"
        onClick={() => number("next")}
      />
    </div>
  );
}
