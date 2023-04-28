import { useGetAllBooksQuery } from "../../services/books";
import { Book } from "../../types";
import OneBook from "./OneBook";
import { motion } from "framer-motion";

const Books = () => {
  const { data: books, isLoading, isError, isSuccess } = useGetAllBooksQuery();

  if (isLoading) return <div>Still Loading</div>;
  if (isError) return <div>Sorry, somthing went wrong!</div>;

  if (isSuccess)
    return (
      <div className="m-2 grid grid-cols-2 gap-4">
        {books.map((book: Book) => {
          return (
            <motion.div
              key={book.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <OneBook book={book} />
            </motion.div>
          );
        })}
      </div>
    );
};

export default Books;
