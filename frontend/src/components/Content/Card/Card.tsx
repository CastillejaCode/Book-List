import { useState } from "react";
import { Book } from "../../../types";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Image from "./Image";
import Rating from "./Rating";
import Review from "./Review";

const Card = ({ book }: { book: Book }) => {
  const [showReview, setShowReview] = useState(false);

  const toggleReview = () => {
    setShowReview(!showReview);
  };

  return (
    <div className="w-max">
      <div className="relative z-10 flex h-40 items-center rounded-lg border-2 bg-gray-50 p-2 pl-3 shadow-md">
        <Image title={book.title} />
        <div className="self-start pl-4">
          <h2 className="text-xl font-semibold">{book.title}</h2>
          <h3>{book.author}</h3>
        </div>
        <Rating rating={book.rating} />
        <ChevronDownIcon
          className={`absolute bottom-0 left-1/2 aspect-square w-5 transition-transform duration-300 ${
            showReview ? "rotate-180" : ""
          }`}
          onClick={toggleReview}
        />
      </div>
      <Review review={book.review} showReview={showReview} />
    </div>
  );
};

export default Card;
