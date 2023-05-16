import { useState } from "react";
import { Book } from "../../../../types";
import { useUpdateBookMutation } from "../../../../services/books";

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

  const submitEdit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const body = {
      title,
      author,
      rating,
      review,
    };
    const { id } = book;
    toggleEdit();
    updateBook({ id, body });
  };

  return (
    <form
      onSubmit={submitEdit}
      className={` flex  gap-4 transition-all duration-300`}
    >
      <div className="flex flex-col justify-between gap-2">
        <textarea
          className="w-full rounded-md border-2 border-gray-800/70 pl-2 text-xl"
          id="title"
          rows={2}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        {/* <label htmlFor="author">author</label> */}
        <textarea
          className="w-full rounded-md border-2 border-gray-800/70 pl-2 text-xl"
          id="author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        />
        {/* <label htmlFor="rating">rating</label> */}
        <input
          className="w-fit rounded-md border-2 border-gray-800/70 px-2 text-xl"
          type="number"
          min={1}
          max={5}
          step={0.5}
          id="rating"
          value={rating}
          onChange={(event) => setRating(Number(event.target.value))}
        />
      </div>
      {/* <label htmlFor="review">review</label> */}
      <div className="flex flex-col justify-between">
        <textarea
          className="mb-2 w-full rounded-md border-2 border-gray-800/70 pl-2 text-lg"
          id="review"
          rows={4}
          value={review}
          onChange={(event) => setReview(event.target.value)}
        />
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
      </div>
    </form>
  );
};

export default EditForm;
