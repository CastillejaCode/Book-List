import { useLayoutEffect, useRef, useState } from "react";
import { Book } from "../../../types";
import Review from "./UnderCard/Review";
import Options from "./UnderCard/Options";
import UnderCard from "./UnderCard";
import EditForm from "./EditForm";
import Info from "./Info";

const Card = ({ book }: { book: Book }) => {
  const [showReview, setShowReview] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [height, setHeight] = useState(52);

  // To find out height on paint, to allow for responsive sliding of review card
  const cardRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!cardRef.current) throw Error("ref is not assigned");
    setHeight(cardRef.current.clientHeight);
  }, []);

  const toggleReview = () => {
    setShowReview(!showReview);
    setShowOptions(false);
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
    setShowEdit(false);
  };

  const toggleEdit = () => {
    setShowEdit(!showEdit);
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
          <Info
            {...book}
            handleReview={toggleReview}
            handleOptions={toggleOptions}
            showReview={showReview}
          />
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
