import { useSelector } from "react-redux";
import { Book } from "../types";
import { RootState } from "../store";

export default function useSort(data: Book[] | undefined) {
  const sort = useSelector((state: RootState) => state.sort.value);
  const filter = useSelector((state: RootState) => state.sort.filter);
  const searchTerm = useSelector((state: RootState) =>
    state.search.value.toLowerCase()
  );

  const sortBooks = (books: Book[]) => {
    switch (sort) {
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

  const searchBooks = (books: Book[]) =>
    books.filter((book: Book) =>
      book.title.toLowerCase().startsWith(searchTerm)
    );

  const filterBooks = (books: Book[]) =>
    books.filter((book: Book) => {
      if (filter.read && !filter.notRead) return book.read === true;
      if (!filter.read && filter.notRead) return book.read === false;
      else return book;
    });

  if (!data) return;

  return searchBooks(filterBooks(sortBooks(data)));
}
