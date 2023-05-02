import { useState } from "react";
import { Book } from "../../../types";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import Image from "./Image";
import Rating from "./Rating";
import Review from "./Review";
import Options from "./Options";
import UnderCard from "./UnderCard";
import EditForm from "./EditForm";

const Card = ({ book }: { book: Book }) => {
  const [showReview, setShowReview] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const toggleReview = () => {
    setShowReview(!showReview);
    setShowOptions(false);
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
    setShowReview(false);
  };

  const toggleEdit = () => {
    setShowEdit(!showEdit);
    setShowOptions(false);
  };

  const height = 52;
  return (
    //Extra Div to allow for Review to hide behind main card
    <div
      className={`relative my-4 w-11/12 max-w-md shadow-md transition-all duration-300
        ${showReview || showOptions ? "mb-20" : ""} `}
    >
      <div
        className={`relative z-0 flex h-${height} rounded-lg border-2 border-gray-500/70 bg-gray-50 p-3 `}
      >
        {!showEdit ? (
          <>
            <Image title={book.title} author={book.author} />
            <div
              className={`flex flex-auto flex-col transition-all duration-300`}
            >
              <h2 className="self-start text-2xl font-semibold">
                {book.title}
              </h2>
              <h3 className=" text-xl">{book.author}</h3>
              <div
                className="flex flex-grow justify-center"
                onClick={toggleReview}
              >
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
            />{" "}
          </>
        ) : (
          <EditForm book={book} toggleEdit={toggleEdit} />
        )}
      </div>
      <UnderCard height={height} showReview={showReview}>
        <Review review={book.review} />
      </UnderCard>
      <UnderCard height={height} showOptions={showOptions}>
        <Options id={book.id} toggleEdit={toggleEdit} />
      </UnderCard>
    </div>
  );
};

export default Card;
