import { useGetAllBooksQuery } from "../../services/books";
import { Book } from "../../types";
import Card from "./Card/Card";

const Books = () => {
  const { data: books, isLoading, isError, isSuccess } = useGetAllBooksQuery();

  if (isLoading) return <div>Still Loading</div>;
  if (isError) return <div>Sorry, somthing went wrong!</div>;

  if (isSuccess)
    return (
      <div className=" flex flex-col items-center">
        {books.map((book: Book) => {
          return <Card book={book} key={book.id} />;
        })}
      </div>
    );
};

export default Books;
