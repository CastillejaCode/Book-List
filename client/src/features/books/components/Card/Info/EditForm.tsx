import { SetStateAction, useEffect, useState } from "react";
import { useUpdateBookMutation } from "src/services/books";
import { Book } from "src/types";
import { useRef } from "react";
import clsx from "clsx";

interface Props {
  book: Book;
  setShowForm: React.Dispatch<SetStateAction<boolean>>;
}

const EditForm = ({ book, setShowForm }: Props) => {
  const [updateBook] = useUpdateBookMutation();
  const inputReadRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [rating, setRating] = useState(book.rating);
  const [review, setReview] = useState(book.review);
  // Remove time to allow default date value
  const [startDate, setStartDate] = useState(
    book.startDate?.toString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    book.endDate?.toString().split("T")[0]
  );
  const [read, setRead] = useState(book.read);

  // Set Read toggle based on endDate
  useEffect(() => {
    if (!inputReadRef.current) return;
    if (endDate) inputReadRef.current.disabled = true;
  }, []);

  const submitForm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const body = {
      title,
      author,
      rating,
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
      read,
      review,
    };
    const { id } = book;
    setShowForm(false);
    updateBook({ id, body });
  };

  const handleEndDate = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setEndDate(value);
    setRead(Boolean(value));

    if (!inputReadRef.current) return;
    inputReadRef.current.disabled = Boolean(value);
  };

  return (
    <form
      method="dialog"
      onSubmit={submitForm}
      className="flex flex-col gap-4 text-base transition-all duration-300"
    >
      <div className=" flex justify-around">
        <button className="btn-success  btn-sm btn" type="submit">
          Submit
        </button>
        <button
          type="button"
          className="btn-error btn-sm btn"
          onClick={() => setShowForm(false)}
        >
          Cancel
        </button>
      </div>
      <div className="divider my-0"></div>
      <label>
        Title
        <input
          className="w-full rounded-md border-2 border-gray-800/70 pl-2 "
          type="text"
          value={title}
          required
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>
      <label htmlFor="author">
        Author
        <input
          className="w-full rounded-md border-2 border-gray-800/70 pl-2"
          id="author"
          value={author}
          required
          onChange={(event) => setAuthor(event.target.value)}
        />
      </label>
      <div className="flex flex-col gap-2">
        <label className="flex justify-between gap-2" htmlFor="rating">
          Rating
          <span className="pr-1">{rating}</span>
        </label>
        <input
          type="range"
          min="0"
          max="5"
          id="rating"
          value={rating}
          className="range range-sm"
          step=".5"
          onChange={(event) => setRating(Number(event.target.value))}
        />
        <div className="flex w-full justify-between px-2 text-xs">
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <label className="flex flex-col">
          Start Date
          <input
            type="date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            className="w-full rounded-md border-2 border-gray-800/70 pl-2"
          />
        </label>
        <label className="flex flex-col">
          Finish Date
          <input
            type="date"
            value={endDate}
            onChange={handleEndDate}
            className="w-full rounded-md border-2 border-gray-800/70 pl-2"
          />
        </label>
      </div>
      <label className="mt-4 flex w-full items-center justify-between gap-4 ">
        <span
          className={clsx(
            "flex-1 text-end transition-all duration-150",
            !read && " font-bold"
          )}
        >
          Not Read
        </span>
        <input
          type="checkbox"
          checked={read}
          disabled={Boolean(endDate)}
          ref={inputReadRef}
          onChange={(event) => setRead(event.target.checked)}
          className="toggle"
        />
        <span
          className={clsx(
            "flex-1 transition-all  duration-150",
            read && " font-bold"
          )}
        >
          Read
        </span>
      </label>
      <label>
        Review
        <textarea
          className=" mb-4 w-full rounded-md border-2 border-gray-800/70 p-2"
          id="review"
          rows={8}
          value={review}
          onChange={(event) => setReview(event.target.value)}
        />
      </label>
      <div className=" flex justify-around">
        <button className="btn-success  btn-sm btn" type="submit">
          Submit
        </button>
        <button
          type="button"
          className="btn-error btn-sm btn"
          onClick={() => setShowForm(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditForm;
