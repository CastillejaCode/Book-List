import clsx from "clsx";
import { useState } from "react";
import { useDispatch } from "react-redux";
import ConfirmChoice from "src/components/ui/ConfirmChoice";
import { useDeleteBookMutation } from "src/services/books";
import { setToast } from "src/slices/toastSlice";
import { saveUndo } from "src/slices/undoSlice";
import { Book } from "src/types";
import Cover from "../common/Cover";
import CoverControls from "./CoverControls";
import EditForm from "./EditForm";

interface Props {
  book: Book;
}

export default function Info({ book }: Props) {
  const dispatch = useDispatch();
  const [deleteBook, { isError }] = useDeleteBookMutation();

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

  const handleDelete = async () => {
    try {
      await deleteBook(book.id);
      if (isError) throw new Error("Couldn't delete book");

      dispatch(saveUndo(book));
      setTimeout(() => {
        dispatch(saveUndo(null));
      }, 60000);
    } catch (error) {
      if (error instanceof Error) {
        const { message } = error;
        dispatch(setToast({ type: "error", message }));
      }
    }
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
    <div className="flex flex-col">
      <div className="mb-4">
        <h1 className="text-3xl font-semibold">{book.title}</h1>
        <h2 className="text-2xl">{book.author}</h2>
      </div>
      <div className="flex flex-col items-center gap-1">
        <h3 className="flex items-center gap-2 text-2xl" aria-label="Rating">
          {book.rating}
          <div
            className={clsx(
              "mask mask-heart h-5 w-5",
              heartColors.at(book.rating * 2)
            )}
          ></div>
        </h3>
        <div className="divider my-0 w-1/2 self-center"></div>
        {(book.startDate || book.endDate) && (
          <>
            <div className="flex flex-col items-center">
              <span className="text-xl" aria-label="Start and End Dates">
                {formatDate(book.startDate)} ⇀ {formatDate(book.endDate)}
              </span>
              <span className="text-lg" aria-label="Duration">
                {`${subtractDates(book.endDate, book.startDate)}`}
              </span>
            </div>
            <div className="divider my-0 w-1/2 self-center"></div>
          </>
        )}
        {!book.endDate && book.read && <h3 className="text-lg">Finished</h3>}
        <p aria-label="Review" className="mb-2 text-lg">
          {book.review || "..."}
        </p>
      </div>
      <div className="divider my-0"></div>
      {!showForm && (
        <>
          <div className=" my-4 flex gap-8 px-4">
            <button
              className="btn-warning btn-sm  btn flex-1"
              onClick={() => setShowForm(true)}
            >
              Edit
            </button>
            <button
              className="btn-error btn-sm btn flex-1"
              onClick={() => setShowConfirmChoice(true)}
            >
              Delete
            </button>
            <ConfirmChoice
              visible={showConfirmChoice}
              setVisible={setShowConfirmChoice}
              confirmAction={handleDelete}
            />
          </div>
          <div className="divider my-0"></div>
        </>
      )}
      {showForm && <EditForm book={book} setShowForm={setShowForm} />}
      {!showForm && (
        <div className="mt-4 flex w-full flex-col gap-4">
          <CoverControls
            coverNumber={book.coverNumber}
            id={book.id as string}
          />
          <Cover title={book.title} coverNumber={book.coverNumber} size="L" />
        </div>
      )}
    </div>
  );
}
