import { useRef } from "react";
import Dialog from "src/components/Dialog";
import { useGetBookImageURLQuery } from "src/services/books";
import { Book } from "../../../../types";
import Content from "./Content";
import Info from "./Info";
import { ImageContext } from "./imageContext";

const Card = ({ book }: { book: Book }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const { title, author } = book;
  const {
    data: docs,
    isLoading,
    isError,
  } = useGetBookImageURLQuery({ title, author });

  return (
    <article
      onClick={() => dialogRef.current?.showModal()}
      className="relative  rounded-lg border-2 border-zinc-700 bg-zinc-100 p-3 dark:bg-zinc-800"
    >
      <ImageContext.Provider value={{ docs, isLoading, isError }}>
        <Content {...book} />
      </ImageContext.Provider>
      <Dialog ref={dialogRef}>
        <Info book={book} />
      </Dialog>
    </article>
  );
};

export default Card;
