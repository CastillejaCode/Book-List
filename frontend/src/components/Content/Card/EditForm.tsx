import { useState } from "react";
import { Book } from "../../../types";
import { useUpdateBookMutation } from "../../../services/books";

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
    <form onSubmit={submitEdit}>
      <div>
        <label htmlFor="title">title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="author">author</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="rating">rating</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(event) => setRating(Number(event.target.value))}
        />
      </div>
      <div>
        <label htmlFor="review">review</label>
        <input
          type="textarea"
          id="review"
          value={review}
          onChange={(event) => setReview(event.target.value)}
        />
      </div>
      <div>
        <button type="submit">Submit</button>
        <button onClick={toggleEdit}>Cancel</button>
      </div>
    </form>
  );
};

export default EditForm;
