import Cover from "../common/Cover";
import Rating from "./Rating";

import { CheckCircleIcon } from "@heroicons/react/24/outline";

import { Book } from "src/types";

export default function Content({
  title,
  author,
  rating,
  read,
  coverNumber,
}: Book) {
  return (
    <div className="flex gap-4">
      <Cover title={title} coverNumber={coverNumber} size="M" />
      <div className="flex flex-auto flex-col text-center transition-all duration-300">
        <h2 className=" text-2xl font-semibold">{title}</h2>
        <h3 className=" text-xl">{author}</h3>
      </div>
      <div className="absolute bottom-0 right-0 m-3 flex flex-col items-end justify-between gap-2">
        {read && <CheckCircleIcon className=" aspect-square w-5" />}
        <Rating rating={rating} />
      </div>
    </div>
  );
}
