import { useSelector } from "react-redux";
import { useGetAllBooksQuery } from "../../services/books";
import { Book } from "../../types";
import Card from "./Book";
import { RootState } from "../../store";
import { Sort } from "../../types";
import auth from "../../auth/config";
import UserSettings from "../UserSettings";

// TODO: import to separate module
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
  const showUserSettings = useSelector((state: RootState) => state.toggle.user);
  const showSort = useSelector((state: RootState) => state.toggle.sort);
  const showUser = useSelector((state: RootState) => state.toggle.user);
  const searchTerm = useSelector((state: RootState) =>
    state.search.value.toLowerCase()
  );

  if (isLoading) return <div>Still Loading</div>;
  if (isError) return <div>Sorry, something went wrong!</div>;

  if (!books) return <h1>a bit empty, eh?</h1>;

  // Filter books to individual user
  const userBooks = books.filter((book) => book.uid === auth.currentUser?.uid);
  // Sort books based on option
  const sortedBooks = sortBooks(sort, userBooks);
  // Filter books via search param
  const searchedBooks = sortedBooks.filter((book) =>
    book.title.toLowerCase().startsWith(searchTerm)
  );

  return (
    <div
      className={`flex grid-flow-row flex-col items-center bg-gray-50 transition-all duration-300 md:grid  md:grid-cols-3 md:p-8 2xl:grid-cols-4 ${
        showSort ? "mt-72" : "mt-16"
      }`}
    >
      {userBooks.length < 1 && !showUser && (
        <div className="mt-4 text-lg font-light">
          It's empty here, add something!
        </div>
      )}
      {!showUserSettings ? (
        searchedBooks.map((book: Book) => {
          return <Card book={book} key={book.id} />;
        })
      ) : (
        <UserSettings />
      )}
    </div>
  );
};

export default Books;
