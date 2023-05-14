import { useLayoutEffect, useRef, useState } from "react";
import { useGetBookIdQuery } from "../../../services/books";
import { Book } from "../../../types";
import Review from "./UnderCard/Review";
import Options from "./UnderCard/Options";
import UnderCard from "./UnderCard";
import EditForm from "./EditForm";
import Info from "./Info";
import LeftRight from "./UnderCard/LeftRight";
import { ImageContext } from "./imageContext";

const Card = ({ book }: { book: Book }) => {
  const [showReview, setShowReview] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showImageControls, setShowImageControls] = useState(false);
  const [height, setHeight] = useState(52);

  const { title, author } = book;
  const {
    data: docs,
    isLoading,
    isError,
  } = useGetBookIdQuery({ title, author });

  // To find out height on paint, to allow for responsive sliding of review card
  const cardRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!cardRef.current) throw Error("ref is not assigned");
    setHeight(cardRef.current.clientHeight);
  }, []);

  // toggling for each card that can't be dones with redux
  const toggleReview = () => {
    setShowReview(!showReview);
    setShowOptions(false);
    setShowImageControls(false);
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
    setShowReview(false);
    setShowEdit(false);
    setShowImageControls(false);
  };

  const toggleEdit = () => {
    setShowEdit(!showEdit);
    setShowImageControls(false);
  };

  const toggleImageControls = () => {
    setShowImageControls(!showImageControls);
    setShowOptions(false);
    setShowReview(false);
  };

  return (
    // Extra div to allow for Review to hide behind main card

    <div
      ref={cardRef}
      className={`relative z-0 my-4 w-10/12 max-w-sm shadow-md transition-all duration-300 
        ${showReview || showOptions || showImageControls ? "mb-24" : ""}`}
    >
      <div
        className={`relative flex rounded-lg border-2 border-gray-800 bg-gray-50 p-3 `}
      >
        {!showEdit ? (
          <ImageContext.Provider value={{ docs, isLoading, isError }}>
            <Info
              {...book}
              handleReview={toggleReview}
              handleOptions={toggleOptions}
              handleImage={toggleImageControls}
              showReview={showReview}
            />
          </ImageContext.Provider>
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
      <UnderCard height={height} showImageControls={showImageControls}>
        <LeftRight id={book.id} coverNumber={book.coverNumber} docs={docs} />
      </UnderCard>
    </div>
  );
};

export default Card;
