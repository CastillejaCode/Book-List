import { useSelector } from "react-redux";
import { useGetUserBooksQuery } from "../../services/books";
import { Book } from "../../types";
import Card from "./Book";
import { RootState } from "../../store";
import auth from "../../auth/config";
import UserSettings from "../UserSettings";
import { useAuthState } from "react-firebase-hooks/auth";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import useSort from "../../hooks/useSort";

const Books = () => {
  const [user] = useAuthState(auth);
  const { data, isLoading, isError } = useGetUserBooksQuery(
    user?.uid ?? skipToken
  );
  const books = useSort(data);

  const showUserSettings = useSelector((state: RootState) => state.toggle.user);
  const showSort = useSelector((state: RootState) => state.toggle.sort);
  const showUser = useSelector((state: RootState) => state.toggle.user);

  if (isLoading) return <div>Still Loading</div>;
  if (isError || !books) return <div>Sorry, something went wrong!</div>;

  return (
    <div
      className={`flex grid-flow-row flex-col items-center bg-gray-50 transition-all duration-300 md:grid  md:grid-cols-3 md:p-8 2xl:grid-cols-4 ${
        showSort ? "mt-72" : "mt-16"
      }`}
    >
      {books.length < 1 && !showUser && (
        <div className="mt-4 text-lg font-light">
          It's empty here, add something!
        </div>
      )}
      {!showUserSettings ? (
        books.map((book: Book) => {
          return <Card book={book} key={book.id} />;
        })
      ) : (
        <UserSettings />
      )}
    </div>
  );
};

export default Books;
