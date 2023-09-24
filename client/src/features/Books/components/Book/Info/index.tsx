import Image from "./Image";
import Rating from "./Rating";

import {
  ChevronDownIcon,
  EllipsisVerticalIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

import { Book } from "../../../../../types";

interface Props extends Book {
  handleOptions: () => void;
  handleReview: () => void;
  handleImage: () => void;
  showReview: boolean;
}

export default function Info({
  title,
  author,
  rating,
  read,
  coverNumber,
  handleOptions,
  handleReview,
  handleImage,
  showReview,
}: Props) {
  return (
    <>
      <Image
        title={title}
        author={author}
        coverNumber={coverNumber}
        handleImage={handleImage}
      />
      <div className={`flex flex-auto flex-col transition-all duration-300`}>
        <h2 className="self-start text-2xl font-semibold">{title}</h2>
        <h3 className=" text-xl">{author}</h3>
        <div
          className="flex flex-grow flex-col justify-end"
          onClick={handleReview}
        >
          <div className="flex justify-center ">
            <ChevronDownIcon
              className={` aspect-square w-5 self-end transition-transform duration-300 ${
                showReview ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between ">
        <button className="aspect-square w-6 self-end" onClick={handleOptions}>
          <EllipsisVerticalIcon />
        </button>
        <div className="flex flex-col items-end gap-2">
          {read && <CheckCircleIcon className=" aspect-square w-5" />}
          <Rating rating={rating} />
        </div>
      </div>
    </>
  );
}
