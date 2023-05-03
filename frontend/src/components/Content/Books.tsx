import { useSelector } from "react-redux";
import { useGetAllBooksQuery } from "../../services/books";
import { Book } from "../../types";
import Card from "./Card/Card";
import { RootState } from "../../store";
import { Sort } from "../../types";

const sortBooks = (method: Sort, books: Book[]) => {
  switch (method) {
    case "recent":
      return [...books].sort((a, b) => {
        return b.date - a.date;
      });
    case "title":
      return [...books].sort((a, b) => {
        const nameA = a.title.toLowerCase();
        const nameB = b.title.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    case "author":
      return [...books].sort((a, b) => {
        const authorA = a.author.toLowerCase();
        const AuthorB = b.author.toLowerCase();
        if (authorA < AuthorB) return -1;
        if (authorA > AuthorB) return 1;
        return 0;
      });
    case "rating":
      return [...books].sort((a, b) => {
        return b.rating - a.rating;
      });
    default:
      return books;
  }
};

const Books = () => {
  const { data: books, isLoading, isError } = useGetAllBooksQuery();
  const sort = useSelector((state: RootState) => state.sort.value);
  const showSort = useSelector((state: RootState) => state.toggle.sort);

  if (isLoading) return <div>Still Loading</div>;
  if (isError) return <div>Sorry, somthing went wrong!</div>;

  if (!books) return;

  const sortedBooks = sortBooks(sort, books);

  return (
    <div
      className={`flex flex-col items-center transition-all duration-300 ${
        showSort ? "mt-80" : "mt-16"
      }`}
    >
      {sortedBooks.map((book: Book) => {
        return <Card book={book} key={book.id} />;
      })}
    </div>
  );
};

export default Books;
