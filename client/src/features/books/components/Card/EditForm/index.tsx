import { useState } from "react";
import { Book } from "../../../../../types";
import { useUpdateBookMutation } from "../../../../../services/books";

interface Props {
  book: Book;
  toggleEdit: () => void;
}

const EditForm = ({ book, toggleEdit }: Props) => {
  const [updateBook] = useUpdateBookMutation();

  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [rating, setRating] = useState(book.rating);
  const [review, setReview] = useState(book.review);
  const [read, setRead] = useState(book.read);

  const submitEdit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const body = {
      title,
      author,
      rating,
      review,
      read,
    };
    const { id } = book;
    toggleEdit();
    updateBook({ id, body });
  };

  return (
    <form
      onSubmit={submitEdit}
      className="flex flex-col gap-4 transition-all duration-300"
    >
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
            className="w-full rounded-md border-2 border-gray-800/70 pl-2"
          />
        </label>
        <label className="flex flex-col">
          Finish Date
          <input
            type="date"
            className="w-full rounded-md border-2 border-gray-800/70 pl-2"
          />
        </label>
      </div>
      <label className="flex items-center gap-4">
        <span>Not Read</span>
        <input type="checkbox" className="toggle" />
        <span>Read</span>
      </label>
      <label>
        Review
        <textarea
          className="mb-2 w-full rounded-md border-2 border-gray-800/70 pl-2"
          id="review"
          value={review}
          onChange={(event) => setReview(event.target.value)}
        />
      </label>
      <div className="flex justify-center gap-4">
        <button
          className="rounded-md border-2 border-gray-900/70 px-3 py-1"
          type="submit"
        >
          Submit
        </button>
        <button
          type="button"
          className="rounded-md border-2 border-gray-900/70 px-3 py-1"
          onClick={toggleEdit}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditForm;
