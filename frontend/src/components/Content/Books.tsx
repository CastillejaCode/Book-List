import { useGetAllBooksQuery } from "../../services/books";
import { Book } from "../../types";
import Card from "./Card/Card";

const Books = () => {
  const { data: books, isLoading, isError, isSuccess } = useGetAllBooksQuery();

  if (isLoading) return <div>Still Loading</div>;
  if (isError) return <div>Sorry, somthing went wrong!</div>;

  if (isSuccess)
    return (
      <div className="m-4 flex flex-col items-center gap-4">
        {books.map((book: Book) => {
          return <Card book={book} key={book.id} />;
        })}
      </div>
    );
};

export default Books;
