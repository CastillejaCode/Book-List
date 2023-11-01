import { useLayoutEffect, useRef, useState } from "react";
import { useGetBookImageURLQuery } from "src/services/books";
import { Book } from "../../../../types";
import Review from "./UnderCard/Review";
import Options from "./UnderCard/Options";
import UnderCard from "./UnderCard";
import EditForm from "./EditForm";
import Content from "./Content";
import LeftRight from "./UnderCard/LeftRight";
import { ImageContext } from "./imageContext";
import Info from "./Info";

const Card = ({ book }: { book: Book }) => {
  const [showReview, setShowReview] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showImageControls, setShowImageControls] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  // const [height, setHeight] = useState(52);

  const { title, author } = book;
  const {
    data: docs,
    isLoading,
    isError,
  } = useGetBookImageURLQuery({ title, author });

  // To find out height on paint, to allow for responsive sliding of review card
  // const cardRef = useRef<HTMLDivElement>(null);
  // useLayoutEffect(() => {
  //   if (!cardRef.current) throw Error("ref is not assigned");
  //   setHeight(cardRef.current.clientHeight);
  // }, []);

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
    setShowOptions(false);
    setShowImageControls(false);
  };

  const toggleImageControls = () => {
    setShowImageControls(!showImageControls);
    setShowOptions(false);
    setShowReview(false);
  };

  return (
    // Extra div to allow for Review to hide behind main card

    <article
      onClick={() => dialogRef.current?.showModal()}
      className={
        "relative flex rounded-lg border-2 border-zinc-700 bg-zinc-100 p-3 dark:bg-zinc-800"
      }
    >
      <ImageContext.Provider value={{ docs, isLoading, isError }}>
        <Content
          {...book}
          handleReview={toggleReview}
          handleOptions={toggleOptions}
          handleImage={toggleImageControls}
          showReview={showReview}
        />
      </ImageContext.Provider>
      <dialog ref={dialogRef} className="modal">
        <Info />
      </dialog>

      {/* <UnderCard height={height} showReview={showReview}>
        <Review review={book.review} />
      </UnderCard>
      <UnderCard height={height} showOptions={showOptions}>
        <Options book={book} toggleEdit={toggleEdit} />
      </UnderCard>
      <UnderCard height={height} showImageControls={showImageControls}>
        <LeftRight id={book.id} coverNumber={book.coverNumber} docs={docs} />
      </UnderCard> */}
    </article>
  );
};

export default Card;
