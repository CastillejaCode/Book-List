import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "src/auth/config";
import ErrorPage from "src/components/Error/ErrorPage";
import Loading from "src/components/Loading";
import Toast from "src/components/Toast";
import Card from "src/features/books/components/Card";
import useSort from "src/hooks/useSort";
import { useGetUserBooksQuery } from "src/services/books";
import { Book, Filter, Order, Sort } from "src/types";
import Categorize from "../components/Categorize";
import NavBar from "../components/NavBar";

export default function Books() {
  const [user] = useAuthState(auth);

  const [sort, setSort] = useState<Sort>("Title");
  const [filter, setFilter] = useState<Filter>("All");
  const [order, setOrder] = useState<Order>(true);

  const { data, isLoading, isError } = useGetUserBooksQuery(
    user?.uid ?? skipToken
  );

  const books = useSort({ data, sort, filter, order });

  if (isLoading) return <Loading />;
  if (isError) return <ErrorPage suppliedError="Can't find your books" />;

  return (
    <>
      <NavBar>
        <Categorize
          state={{ sort, filter, order }}
          setState={{ setSort, setFilter, setOrder }}
        />
      </NavBar>
      <main className="mt-14 flex min-h-screen flex-col place-items-center items-center gap-4 p-4 transition-all duration-300 ">
        <div className="grid grid-flow-row gap-4">
          {books &&
            books.map((book: Book) => {
              return <Card book={book} key={book.id} />;
            })}
        </div>
      </main>
      <Toast />
    </>
  );
}
