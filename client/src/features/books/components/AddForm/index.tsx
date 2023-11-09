import clsx from "clsx";
import React, { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import auth from "src/auth/config";
import { useAddBookMutation } from "src/services/books";
import { setToast } from "src/slices/notificationSlice";
import { setUndoStatus } from "src/slices/undoSlice";

interface Props {
  toggleOpen: () => void;
}

export default function AddForm({ toggleOpen }: Props) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [read, setRead] = useState(false);
  const inputReadRef = useRef<HTMLInputElement>(null);

  const [user] = useAuthState(auth);
  const [addBook] = useAddBookMutation();

  const submitForm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!user) return;
    try {
      addBook({
        title,
        author,
        rating,
        read,
        review,
        date: Date.now(),
        uid: user?.uid,
        coverNumber: 0,
      });
    } catch (error) {
      if (error instanceof Error) dispatch(setToast(error.message));
    }

    setTitle("");
    setAuthor("");
    setRating(0);
    setReview("");
    toggleOpen();
    dispatch(setUndoStatus(false));
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
      onSubmit={submitForm}
      className="flex flex-col gap-4 text-base transition-all duration-300"
    >
      <h1 className="self-center text-2xl">Add Book</h1>
      <label>
        Title
        <input
          className="w-full rounded-md border-2 border-gray-800/70 pl-2 "
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>
      <label htmlFor="author">
        Author
        <input
          className="w-full rounded-md border-2 border-gray-800/70 pl-2"
          id="author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        />
      </label>
      <div>
        <label className="flex justify-between gap-2" htmlFor="rating">
          Rating
          <span>{rating}</span>
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
        <span className={clsx("flex-1 text-end")}>Not Read</span>
        <input
          type="checkbox"
          checked={read}
          ref={inputReadRef}
          onChange={(event) => setRead(event.target.checked)}
          className="toggle"
        />
        <span className="flex-1">Read</span>
      </label>
      <label>
        Review
        <textarea
          className="mb-2 w-full rounded-md border-2 border-gray-800/70 px-2"
          id="review"
          rows={8}
          value={review}
          onChange={(event) => setReview(event.target.value)}
        />
      </label>
    </form>
  );
}
