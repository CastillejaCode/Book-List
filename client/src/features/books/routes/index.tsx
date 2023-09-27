import { useSelector } from "react-redux";
import { useGetUserBooksQuery } from "src/services/books";
import { Book } from "src/types";
import Card from "src/features/books/components/Card";
import { RootState } from "src/store";
import auth from "src/auth/config";
import UserSettings from "src/features/user/components";
import { useAuthState } from "react-firebase-hooks/auth";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import useSort from "src/hooks/useSort";

export default function Books() {
  const [user] = useAuthState(auth);
  const { data, isLoading, isError } = useGetUserBooksQuery(
    user?.uid ?? skipToken
  );
  const books = useSort(data);

  const showUserSettings = useSelector((state: RootState) => state.toggle.user);
  const showSort = useSelector((state: RootState) => state.toggle.sort);
  const showUser = useSelector((state: RootState) => state.toggle.user);

  // if (isLoading) return <div>Still Loading</div>;
  // if (isError || !books) return <div>Sorry, something went wrong!</div>;

  return (
    <div>stuff</div>
    // <main
    //   className={`flex flex-col place-items-center items-center transition-all duration-300 lg:grid lg:grid-cols-3 lg:p-8 2xl:grid-cols-4 ${
    //     showSort ? "mt-72" : "mt-16"
    //   }`}
    // >
    //   {books.length < 1 && !showUser && (
    //     <div className="mt-4 text-lg font-light">
    //       It's empty here, add something!
    //     </div>
    //   )}
    //   {!showUserSettings ? (
    //     books.map((book: Book) => {
    //       return <Card book={book} key={book.id} />;
    //     })
    //   ) : (
    //     <UserSettings />
    //   )}
    // </main>
  );
}
