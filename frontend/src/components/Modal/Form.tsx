import React, { useState } from "react";
import { useAddBookMutation } from "../../services/books";
import { setUndoStatus } from "../../features/undoSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import auth from "../../auth/config";

const Form = ({ toggleOpen }: { toggleOpen: () => void }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState<number>(3);
  const [review, setReview] = useState("");

  const [addBook] = useAddBookMutation();

  const submitForm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      addBook({
        title,
        author,
        rating,
        review,
        date: Date.now(),
        uid: auth.currentUser?.uid,
        img: 0,
      });
    } catch (error) {
      console.log(error);
    }

    setTitle("");
    setAuthor("");
    setRating(0);
    setReview("");
    toggleOpen();
    dispatch(setUndoStatus(false));
  };

  return (
    <div>
      <form
        onSubmit={submitForm}
        className="flex flex-col items-start gap-2 p-4"
      >
        <div className="flex flex-col items-start">
          <label htmlFor="title">title</label>
          <input
            className="rounded-md border-2 border-gray-500 pl-2"
            type="text"
            id="title"
            required
            autoFocus
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <div className="flex flex-col items-start">
          <label htmlFor="author">author</label>
          <input
            className="rounded-md border-2 border-gray-500 pl-2"
            type="text"
            id="author"
            required
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>

        <div className="flex flex-col items-start">
          <label htmlFor="rating">rating</label>
          <input
            className="rounded-md border-2 border-gray-500 pl-2"
            type="number"
            id="rating"
            min={1}
            max={5}
            required
            value={rating}
            onChange={(event) => setRating(Number(event.target.value))}
          />
        </div>
        <label htmlFor="review" className="mb-4 flex flex-col items-start">
          review
          <textarea
            className="rounded-md border-2 border-gray-500 pl-2"
            name="review"
            id="review"
            cols={20}
            rows={2}
            value={review}
            onChange={(event) => setReview(event.target.value)}
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
