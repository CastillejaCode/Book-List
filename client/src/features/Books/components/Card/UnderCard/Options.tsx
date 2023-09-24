import { useDispatch } from "react-redux";
import { useDeleteBookMutation } from "../../../../../services/books";
import { Book } from "../../../../../types";
import { saveUndo, setUndoStatus } from "../../../../../slices/undoSlice";

interface Props {
  book: Book;
  toggleEdit: () => void;
}

const Options = ({ book, toggleEdit }: Props) => {
  const dispatch = useDispatch();
  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = () => {
    dispatch(saveUndo({ ...book }));
    deleteBook(book.id);
    dispatch(setUndoStatus(true));
    setTimeout(() => {
      dispatch(setUndoStatus(false));
    }, 30000);
  };

  return (
    <div className="relative flex justify-center gap-20 ">
      <button
        className="rounded-md border-2 border-gray-700 bg-zinc-100 px-3 py-1"
        onClick={handleDelete}
      >
        Delete
      </button>
      <button
        className="relative z-50 rounded-md border-2 border-gray-700 bg-zinc-100 px-3 py-1"
        onClick={toggleEdit}
      >
        Edit
      </button>
    </div>
  );
};

export default Options;
