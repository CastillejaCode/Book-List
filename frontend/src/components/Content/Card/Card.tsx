import { useLayoutEffect, useRef, useState } from "react";
import { Book } from "../../../types";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import Image from "./Image";
import Rating from "./Rating";
import Review from "./Review";
import Options from "./Options";

const Card = ({ book }: { book: Book }) => {
  const [showReview, setShowReview] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const toggleReview = () => {
    setShowReview(!showReview);
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const height = 52;
  return (
    //Extra Div to allow for Review to hide behind main card
    <div className="relative m-6">
      <div
        className={`relative z-0 flex h-${height} rounded-lg border-2 border-gray-500/70 bg-gray-50 p-2`}
      >
        <Image title={book.title} />
        <div className="flex flex-col pl-4">
          <h2 className="self-start text-2xl font-semibold">{book.title}</h2>
          <h3 className=" text-xl">{book.author}</h3>
          <div className="flex flex-grow justify-center" onClick={toggleReview}>
            <ChevronDownIcon
              className={` aspect-square w-5 self-end transition-transform duration-300 ${
                showReview ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
        <Rating rating={book.rating} />
        <EllipsisVerticalIcon
          className="absolute right-0 aspect-square w-5"
          onClick={toggleOptions}
        />
      </div>
      <Review review={book.review} showReview={showReview} height={height} />
      <Options showOptions={showOptions} />
    </div>
  );
};

export default Card;
