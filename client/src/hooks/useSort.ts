import { useSelector } from "react-redux";
import { Book } from "../types";
import { RootState } from "../store";
import { Sort, Filter, Order } from "../types";

interface Args {
  data: Book[];
  sort: Sort;
  filter: Filter;
  order: Order;
}

export default function useSort({ data, sort, filter, order }: Args) {
  const searchTerm = useSelector((state: RootState) =>
    state.search.value.toLowerCase()
  );

  const sortBooks = (books: Book[]) => {
    switch (sort) {
      case "Date":
        return [...books].sort((a, b) => {
          return b.date - a.date;
        });
      case "Title":
        return [...books].sort((a, b) => {
          const nameA = a.title.toLowerCase();
          const nameB = b.title.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
      case "Author":
        return [...books].sort((a, b) => {
          const authorA = a.author.toLowerCase();
          const AuthorB = b.author.toLowerCase();
          if (authorA < AuthorB) return -1;
          if (authorA > AuthorB) return 1;
          return 0;
        });
      case "Rating":
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
      if (filter === true) return book.read === true;
      if (filter === false) return book.read === false;
      return book;
    });

  if (!data) return;

  return searchBooks(filterBooks(sortBooks(data)));
}
