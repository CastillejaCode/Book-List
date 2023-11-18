import { useState } from "react";
import ConfirmChoice from "src/components/ConfirmChoice";
import { useDeleteBookMutation } from "src/services/books";
import { Book } from "src/types";
import Cover from "../common/Cover";
import EditForm from "./EditForm";
import CoverControls from "./CoverControls";
import clsx from "clsx";

interface Props {
  book: Book;
}

export default function Info({ book }: Props) {
  const [deleteBook] = useDeleteBookMutation();
  const [showForm, setShowForm] = useState(false);
  const [showConfirmChoice, setShowConfirmChoice] = useState(false);

  const formatDate = (rawDate: Date | null) => {
    if (!rawDate) return "";

    const date = new Date(rawDate);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();

    return `${month}/${day}/${year}`;
  };

  const subtractDates = (date1: Date | null, date2: Date | null) => {
    if (!date1 || !date2) return "";

    const getUnix = (date: Date) => new Date(date).valueOf();

    const days =
      Math.abs(getUnix(date1) - getUnix(date2)) / (1000 * 60 * 60 * 24);

    return `${days} ${days === 1 ? "day" : "days"}`;
  };

  const heartColors = [
    "bg-red-600/10",
    "bg-red-600/20",
    "bg-red-600/30",
    "bg-red-600/40",
    "bg-red-600/50",
    "bg-red-600/60",
    "bg-red-600/70",
    "bg-red-600/80",
    "bg-red-600/90",
    "bg-red-600",
    "bg-green-600",
  ];

  return (
    <div className="flex flex-col gap-4 ">
      <div>
        <h1 className="text-3xl font-semibold">{book.title}</h1>
        <h2 className="text-2xl">{book.author}</h2>
      </div>
      <div className="flex flex-col items-center gap-6">
        <h3 className="flex items-center gap-2 text-2xl" aria-label="Rating">
          {book.rating}
          <div
            className={clsx(
              "mask mask-heart h-5 w-5",
              heartColors.at(book.rating * 2)
            )}
          ></div>
        </h3>
        {(book.startDate || book.endDate) && (
          <div className="flex flex-col items-center">
            <h3 className="text-xl" aria-label="Start and End Dates">
              {formatDate(book.startDate)} ⇀ {formatDate(book.endDate)}
            </h3>
            <p className="text-lg" aria-label="Duration">
              {`${subtractDates(book.endDate, book.startDate)}`}
            </p>
          </div>
        )}
        {!book.endDate && book.read && <h3 className="text-lg">Finished</h3>}
        <p aria-label="Review" className="text-lg">
          {book.review}
        </p>
      </div>
      <div className="divider my-0"></div>
      {!showForm && (
        <>
          <div className=" flex justify-around">
            <button
              className="btn-warning  btn-sm btn"
              onClick={() => setShowForm(true)}
            >
              Edit
            </button>
            <button
              className="btn-error btn-sm btn"
              onClick={() => setShowConfirmChoice(true)}
            >
              Delete
            </button>
            <ConfirmChoice
              visible={showConfirmChoice}
              setVisible={setShowConfirmChoice}
              confirmAction={() => deleteBook(book.id)}
            />
          </div>
          <div className="divider my-0"></div>
        </>
      )}
      {showForm && <EditForm book={book} setShowForm={setShowForm} />}
      {!showForm && (
        <div className="flex w-full flex-col gap-4">
          <Cover title={book.title} coverNumber={book.coverNumber} size="L" />
          <CoverControls coverNumber={book.coverNumber} id={book.id} />
        </div>
      )}
    </div>
  );
}
