import Image from "./Image";
import Rating from "./Rating";

import { CheckCircleIcon } from "@heroicons/react/24/outline";

import { Book } from "src/types";

interface Props extends Book {
  handleImage: () => void;
}

export default function Content({
  title,
  author,
  rating,
  read,
  coverNumber,
  handleImage,
}: Props) {
  return (
    <div>
      <Image
        title={title}
        author={author}
        coverNumber={coverNumber}
        handleImage={handleImage}
      />
      <div className={`flex flex-auto flex-col transition-all duration-300`}>
        <h2 className="self-start text-2xl font-semibold">{title}</h2>
        <h3 className=" text-xl">{author}</h3>
      </div>
      <div className="flex flex-col justify-between ">
        <div className="flex flex-col items-end gap-2">
          {read && <CheckCircleIcon className=" aspect-square w-5" />}
          <Rating rating={rating} />
        </div>
      </div>
    </div>
  );
}
