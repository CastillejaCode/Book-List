import { useDeleteBookMutation } from "../../services/books";
import { useState } from "react";
import { Book } from "../../types";

const OneBook = ({ book }: { book: Book }) => {
  const [reveal, setReveal] = useState(false);
  const [deleteBook] = useDeleteBookMutation();

  const toggleReveal = () => {
    setReveal(!reveal);
  };

  return (
    <li key={book.id}>
      <div className="flex flex-col items-start">
        <h3 className="text-xl font-bold">{book.title}</h3>
        <h4>{book.author}</h4>
        <p>{book.rating}</p>
        {reveal && book.review}
        <button onClick={toggleReveal}>
          {!reveal ? "Show more" : "Show less"}
        </button>
        <button onClick={() => deleteBook(book.id)}>Delete</button>
        <button>Update</button>
      </div>
    </li>
  );
};

export default OneBook;
