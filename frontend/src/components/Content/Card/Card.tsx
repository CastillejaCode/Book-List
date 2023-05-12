import { useLayoutEffect, useRef, useState } from "react";
import { Book } from "../../../types";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import Image from "./Image";
import Rating from "./Rating";
import Review from "./Review";
import Options from "./Options";
import UnderCard from "./UnderCard";
import EditForm from "./EditForm";
import LeftRight from "./LeftRight";
import { useUpdateBookMutation } from "../../../services/books";

const Card = ({ book }: { book: Book }) => {
  const [showReview, setShowReview] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [height, setHeight] = useState(52);

  const [updateBook] = useUpdateBookMutation();

  // To find out height on paint, to allow for responsive sliding of review card
  const cardRef = useRef(null);
  useLayoutEffect(() => {
    setHeight(cardRef.current.clientHeight);
  }, []);

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

  return (
    //Extra Div to allow for Review to hide behind main card
    <div
      ref={cardRef}
      className={`relative my-4 w-11/12 max-w-sm shadow-md transition-all duration-300 
        ${showReview || showOptions ? "mb-24" : ""}`}
    >
      <div
        className={`relative z-0 flex rounded-lg border-2 border-gray-800 bg-gray-50 p-3 `}
      >
        {!showEdit ? (
          <>
            <Image
              title={book.title}
              author={book.author}
              coverNumber={book.coverNumber}
            />
            <div
              className={`flex flex-auto flex-col transition-all duration-300`}
            >
              <h2 className="self-start text-2xl font-semibold">
                {book.title}
              </h2>
              <h3 className=" text-xl">{book.author}</h3>
              <div
                className="flex flex-grow flex-col justify-end"
                // onClick={toggleReview}
              >
                <LeftRight id={book.id} coverNumber={book.coverNumber} />
                <div className="flex justify-center ">
                  <ChevronDownIcon
                    className={` aspect-square w-5 self-end transition-transform duration-300 ${
                      showReview ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>
            </div>
            <Rating rating={book.rating} />
            <EllipsisVerticalIcon
              className="absolute right-0 aspect-square w-5"
              onClick={toggleOptions}
            />
          </>
        ) : (
          <EditForm book={book} toggleEdit={toggleEdit} />
        )}
      </div>
      <UnderCard height={height} showReview={showReview}>
        <Review review={book.review} />
      </UnderCard>
      <UnderCard height={height} showOptions={showOptions}>
        <Options book={book} toggleEdit={toggleEdit} />
      </UnderCard>
    </div>
  );
};

export default Card;
