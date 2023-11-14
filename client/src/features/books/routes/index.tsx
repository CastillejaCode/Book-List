import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import auth from "src/auth/config";
import Loading from "src/components/Loading";
import Card from "src/features/books/components/Card";
import useSort from "src/hooks/useSort";
import { useGetUserBooksQuery } from "src/services/books";
import { RootState } from "src/store";
import { Book, Sort, Filter, Order } from "src/types";
import NavBar from "../components/NavBar";
import ErrorPage from "src/components/Error/ErrorPage";
import Toast from "src/components/Toast";
import Categorize from "../components/Categorize";
import { useState } from "react";
import { setFilter } from "src/slices/categorizeSlice";

export default function Books() {
  const [user] = useAuthState(auth);

  const [sort, setSort] = useState<Sort>("Title");
  const [filter, setFilter] = useState<Filter>("All");
  const [order, setOrder] = useState<Order>(true);

  const { data, isLoading, isError } = useGetUserBooksQuery(
    user?.uid ?? skipToken
  );
  const books = useSort({ data, sort, filter, order });

  const showSort = useSelector((state: RootState) => state.toggle.sort);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorPage suppliedError="Can't find your books" />;

  return (
    <>
      <NavBar />
      <main
        className={`flex min-h-screen flex-col place-items-center items-center gap-4 p-4 transition-all duration-300 lg:grid lg:grid-cols-3 lg:p-8 2xl:grid-cols-4 ${
          showSort ? "mt-72" : "mt-16"
        }`}
      >
        <Categorize
          state={{ sort, filter, order }}
          setState={{ setSort, setFilter, setOrder }}
        />
        <div>
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
