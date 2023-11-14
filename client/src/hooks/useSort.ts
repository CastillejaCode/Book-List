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

  const searchBooks = (books: Book[]) =>
    books.filter((book: Book) =>
      book.title.toLowerCase().startsWith(searchTerm)
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

  const filterBooks = (books: Book[]) => {
    if (filter === "All") return books;

    return books.filter((book: Book) => {
      if (filter === "Read") return book.read === true;
      if (filter === "Not Read") return book.read === false;
      return book;
    });
  };

  const categorizeBooks = (data: Book[]) => {
    // searching supersedes categorizing books
    if (searchTerm) return searchBooks(data);

    const sorted = sortBooks(data);
    const filtered = filterBooks(sorted);
    return filtered;
  };

  if (!data) return;

  return categorizeBooks(data);
}
