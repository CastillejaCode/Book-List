import { useState } from "react";
import { useGetAllBooksQuery } from "../../services/books";
import { Book } from "../../types";
import OneBook from "./OneBook";
import Form from "./Form";

const Books = () => {
  const { data: books, isLoading, isError, isSuccess } = useGetAllBooksQuery();
  const [viewForm, setViewForm] = useState(false);

  const toggleForm = () => {
    setViewForm(!viewForm);
  };

  if (isLoading) return <div>Still Loading</div>;
  if (isError) return <div>Sorry, somthing went wrong!</div>;

  if (isSuccess)
    return (
      <div className="flex flex-col ">
        <ul>
          {books.map((book: Book) => {
            return <OneBook book={book} key={book.id} />;
          })}
        </ul>
        <button
          className="w-fit rounded-lg border-2 border-gray-900 px-2 text-4xl"
          onClick={toggleForm}
        >
          +
        </button>
        {viewForm && <Form toggleForm={toggleForm} />}
      </div>
    );
};

export default Books;
