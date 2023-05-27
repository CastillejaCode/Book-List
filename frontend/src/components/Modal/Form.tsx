import React, { useState } from "react";
import { useAddBookMutation } from "../../services/books";
import { setUndoStatus } from "../../features/undoSlice";
import { useDispatch } from "react-redux";
import auth from "../../auth/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useField } from "../../hooks/useField";
import { setToast } from "../../features/notificationSlice";
import Toast from "../UserSettings/Toast";

const Form = ({ toggleOpen }: { toggleOpen: () => void }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useField({ id: "title", type: "text" });
  const [author, setAuthor] = useField({ id: "author", type: "text" });
  const [rating, setRating] = useField({ id: "rating", type: "number" });
  const [review, setReview] = useField({ id: "review", type: "text" });
  const [read, setRead] = useState(true);

  const [user] = useAuthState(auth);
  const [addBook] = useAddBookMutation();

  const submitForm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!user) return;
    try {
      addBook({
        title: title.value,
        author: author.value,
        rating: Number(rating.value),
        read: read,
        review: review.value,
        date: Date.now(),
        uid: user?.uid,
        coverNumber: 0,
      });
    } catch (error) {
      if (error instanceof Error) dispatch(setToast(error.message));
    }

    setTitle("");
    setAuthor("");
    setRating("0");
    setReview("");
    toggleOpen();
    dispatch(setUndoStatus(false));
  };

  return (
    <div>
      <Toast />
      <form
        onSubmit={submitForm}
        className="flex flex-col items-start gap-2 p-4"
      >
        <div className="flex flex-col items-start">
          <label htmlFor="title">title</label>
          <input
            className="rounded-md border-2 border-gray-500 pl-2"
            {...title}
            required
            autoFocus
          />
        </div>

        <div className="flex flex-col items-start">
          <label htmlFor="author">author</label>
          <input
            className="rounded-md border-2 border-gray-500 pl-2"
            {...author}
            required
          />
        </div>

        <div className="flex w-full justify-between align-baseline">
          <div className="flex flex-col items-start">
            <label htmlFor="rating">rating</label>
            <input
              className="rounded-md border-2 border-gray-500 pl-2"
              {...rating}
              min={1}
              max={5}
              required
            />
          </div>
          <div className=" flex flex-col items-center justify-between">
            <label htmlFor="read">read</label>
            <input
              className="checkbox bg-slate-700"
              type="checkbox"
              defaultChecked={read}
              onChange={(e) => setRead(e.target.checked)}
            />
          </div>
        </div>
        <label htmlFor="review" className="mb-4 flex flex-col items-start">
          review
          <textarea
            className="rounded-md border-2 border-gray-500 pl-2"
            {...review}
            cols={20}
            rows={2}
          />
        </label>

        <button type="submit" className="btn self-center bg-slate-700">
          Add
        </button>
      </form>
    </div>
  );
};

export default Form;
