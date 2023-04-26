import { useState } from "react";
import { useGetAllBooksQuery } from "../../services/books";
import { BookType } from "../../types";
import Form from "./Form";

const Book = ({ book }: { book: BookType }) => {
  const [reveal, setReveal] = useState(false);

  const toggleReveal = () => {
    setReveal(!reveal);
  };

  return (
    <li key={book._id}>
      <div className="flex flex-col items-start">
        <h3 className="text-xl font-bold">{book.title}</h3>
        <h4>{book.author}</h4>
        <p>{book.rating}</p>
        {reveal && book.review}
        <button onClick={toggleReveal}>
          {!reveal ? "Show more" : "Show less"}
        </button>
      </div>
    </li>
  );
};

const Books = () => {
  const { data: books, isLoading } = useGetAllBooksQuery("");
  const [viewForm, setViewForm] = useState(false);

  if (isLoading) return <div>Still Loading</div>;

  return (
    <div className="flex flex-col ">
      <ul>
        {books.map((book: BookType) => {
          return <Book book={book} key={book._id} />;
        })}
      </ul>
      <button
        className="w-fit rounded-lg border-2 border-gray-900 px-2 text-4xl"
        onClick={() => setViewForm(!viewForm)}
      >
        +
      </button>
      {viewForm && <Form />}
    </div>
  );
};

export default Books;
