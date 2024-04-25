import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "src/auth/config";
import ErrorPage from "src/components/function/Error/ErrorPage";
import Loading from "src/components//ui/Loading";
import Toast from "src/components/ui/Toast";
import Card from "src/features/books/components/Card";
import useSort from "src/hooks/useSort";
import { useGetUserBooksQuery } from "src/services/books";
import { Book, Filter, Order, Sort } from "src/types";
import Categorize from "../components/Categorize";
import NavBar from "../components/NavBar";

export default function Books() {
  const [user] = useAuthState(auth);

  const [sort, setSort] = useState<Sort>(
    (localStorage.getItem("sort") as Sort) ?? "Title"
  );
  const [filter, setFilter] = useState<Filter>(
    (localStorage.getItem("filter") as Filter) ?? "All"
  );
  const [order, setOrder] = useState<Order>(
    Boolean(localStorage.getItem("order"))
  );

  const { data, isLoading, isError } = useGetUserBooksQuery(
    user?.uid ?? skipToken
  );

  const books = useSort({ data, sort, filter, order });

  if (isLoading) return <Loading />;
  if (isError) return <ErrorPage suppliedError="Can't find your books" />;

  return (
    <div className="flex min-h-screen flex-col items-center">
      <NavBar>
        <Categorize
          state={{ sort, filter, order }}
          setState={{ setSort, setFilter, setOrder }}
        />
      </NavBar>
      <main className="w-full max-w-7xl flex-1 p-8">
        <div
          className="grid place-items-center gap-8"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(17rem , 1fr))",
          }}
        >
          {books &&
            books.map((book: Book) => {
              return <Card book={book} key={book.id} />;
            })}
        </div>
      </main>
      <Toast />
    </div>
  );
}
