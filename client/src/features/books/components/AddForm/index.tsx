import clsx from "clsx";
import React, { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import auth from "src/auth/config";
import useToast from "src/hooks/useToast";
import { useAddBookMutation } from "src/services/books";
import { addToast } from "src/slices/toastSlice";
import { z } from "zod";

const Book = z.object({
  title: z.string().max(50),
  author: z.string().max(50),
  rating: z.number().min(0).max(5),
  read: z.boolean(),
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
  review: z.string().max(8000),
  date: z.date(),
  uid: z.string(),
  coverNumber: z.number(),
});

export default function AddForm() {
  const { addToast } = useToast();
  const [addBook] = useAddBookMutation();
  const inputReadRef = useRef<HTMLInputElement>(null);
  const [user] = useAuthState(auth);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [read, setRead] = useState(false);

  const submitForm = async () => {
    if (!user) return;

    try {
      const formData = Book.parse({
        title,
        author,
        rating,
        read,
        review,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        date: new Date(),
        uid: user?.uid,
        coverNumber: 0,
      });

      await addBook(formData);
      setTitle("");
      setAuthor("");
      setRating(0);
      setReview("");
      setStartDate("");
      setEndDate("");
      setRead(false);
      addToast({ message: "Book added" });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        const { message } = error;
        addToast({ type: "error", message });
      }
    }
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
      <h1 className="self-center text-2xl">Add Book</h1>
      <label>
        Title*
        <input
          className="w-full rounded-md border-2 border-gray-800/70 pl-2 "
          type="text"
          value={title}
          required
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>
      <label htmlFor="author">
        Author*
        <input
          className="w-full rounded-md border-2 border-gray-800/70 pl-2"
          id="author"
          value={author}
          required
          onChange={(event) => setAuthor(event.target.value)}
        />
      </label>
      <div className="flex flex-col gap-1">
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
          className="mb-2 w-full rounded-md border-2 border-gray-800/70 p-2"
          id="review"
          rows={8}
          value={review}
          onChange={(event) => setReview(event.target.value)}
        />
      </label>
      <button type="submit" className="btn">
        Submit
      </button>
    </form>
  );
}
