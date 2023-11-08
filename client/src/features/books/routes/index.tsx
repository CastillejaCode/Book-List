import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import auth from "src/auth/config";
import CheckAuth from "src/components/Error/CheckAuth";
import Loading from "src/components/Loading";
import Card from "src/features/books/components/Card";
import useSort from "src/hooks/useSort";
import { useGetUserBooksQuery } from "src/services/books";
import { RootState } from "src/store";
import { Book } from "src/types";

export default function Books() {
  const [user] = useAuthState(auth);
  const { data, isLoading, isError } = useGetUserBooksQuery(
    user?.uid ?? skipToken
  );
  const books = useSort(data);

  const showSort = useSelector((state: RootState) => state.toggle.sort);

  if (isLoading) return <Loading />;
  if (isError || !books) return <div>Sorry, something went wrong!</div>;

  return (
    <CheckAuth>
      <main
        className={`flex min-h-screen flex-col place-items-center items-center transition-all duration-300 lg:grid lg:grid-cols-3 lg:p-8 2xl:grid-cols-4 ${
          showSort ? "mt-72" : "mt-16"
        }`}
      >
        {books.map((book: Book) => {
          return <Card book={book} key={book.id} />;
        })}
      </main>
    </CheckAuth>
  );
}
