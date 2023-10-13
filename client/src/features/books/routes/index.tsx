import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import auth from "src/auth/config";
import Card from "src/features/books/components/Card";
import useSort from "src/hooks/useSort";
import { useGetUserBooksQuery } from "src/services/books";
import { RootState } from "src/store";
import { Book } from "src/types";
import Menu from "../components/Menu";
import NavBar from "src/components/NavBar";

export default function Books() {
  const [user] = useAuthState(auth);
  const { data, isLoading, isError } = useGetUserBooksQuery(
    user?.uid ?? skipToken
  );
  const books = useSort(data);

  const showSort = useSelector((state: RootState) => state.toggle.sort);

  if (isLoading) return <div>Still Loading</div>;
  if (isError || !books) return <div>Sorry, something went wrong!</div>;

  return (
    <>
      <NavBar />
      <main
        className={`flex flex-col place-items-center items-center transition-all duration-300 lg:grid lg:grid-cols-3 lg:p-8 2xl:grid-cols-4 ${
          showSort ? "mt-72" : "mt-16"
        }`}
      >
        {books.map((book: Book) => {
          return <Card book={book} key={book.id} />;
        })}
      </main>
    </>
  );
}
