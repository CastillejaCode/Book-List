import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useUpdateBookMutation } from "../../../../services/books";
interface Props {
  id: string;
  coverNumber: number;
}

export default function LeftRight({ id, coverNumber }: Props) {
  const [updateBook] = useUpdateBookMutation();

  const number = (condition: "next" | "prev") => {
    let value = coverNumber;
    if (condition === "next") value += 1;
    if (condition === "prev") value -= 1;

    if (value < 0) return;
    const body = { coverNumber: value };

    updateBook({ id, body });
  };

  return (
    <div className=" flex justify-center gap-8">
      <ChevronLeftIcon
        className="aspect-square w-7"
        onClick={() => number("prev")}
      />
      <ChevronRightIcon
        className="aspect-square w-7"
        onClick={() => number("next")}
      />
    </div>
  );
}
