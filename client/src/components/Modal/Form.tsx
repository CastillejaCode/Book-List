import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import auth from "../../auth/config";
import { setToast } from "../../features/notificationSlice";
import { setUndoStatus } from "../../features/undoSlice";
import { useField } from "../../hooks/useField";
import { useAddBookMutation } from "../../services/books";
import SubmitButton from "../general/SubmitButton";

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
    <form
      onSubmit={submitForm}
      className="flex flex-col items-center gap-4 p-8 "
    >
      <h1 className="text-center text-3xl font-medium">Add Book</h1>
      <label className="flex w-full flex-col">
        title *
        <input
          className="w-full rounded-md border-2 border-zinc-500 px-2 py-1"
          {...title}
          required
          autoFocus
        />
      </label>

      <label className="flex w-full flex-col">
        author *
        <input
          className="w-full rounded-md border-2 border-zinc-500 px-2 py-1"
          {...author}
          required
        />
      </label>

      <div className="flex w-full justify-around ">
        <label className="flex flex-col items-center gap-1">
          rating *
          <input
            className="w-16 rounded-md border-2 border-zinc-500 pl-2"
            {...rating}
            min="1"
            max="5"
            step=".5"
            required
          />
        </label>
        <div className=" flex flex-col items-center justify-between">
          <label className="flex flex-col items-center  gap-1">
            read?
            <input
              className="checkbox bg-zinc-200"
              type="checkbox"
              defaultChecked={read}
              onChange={(e) => setRead(e.target.checked)}
            />
          </label>
        </div>
      </div>
      <label className="mb-4 flex h-fit w-full flex-col">
        review
        <textarea
          className="h-36 rounded-md border-2 border-zinc-500 p-2"
          spellCheck
          {...review}
          cols={20}
          rows={2}
        />
      </label>
      <SubmitButton />
    </form>
  );
};

export default Form;
