import { useState } from "react";
import { useDeleteBookMutation } from "../../services/books";

interface Props {
  id: string;
  options: boolean;
}

const Options = ({ id, options }: Props) => {
  const [deleteBook] = useDeleteBookMutation();
  const [viewConfirm, setViewConfirm] = useState(false);

  const handleDelete = () => {
    deleteBook(id);
  };

  return (
    <div
      className={`absolute -right-20 flex flex-col gap-2 transition-all duration-300 ${
        !options ? "invisible -translate-x-3 opacity-0" : "visible opacity-100"
      }`}
    >
      <button
        onClick={handleDelete}
        className="rounded-lg border-2 border-gray-800 bg-red-400 px-2"
      >
        Delete
      </button>
      <button className="rounded-lg border-2 border-gray-800 bg-yellow-300 px-2">
        Edit
      </button>
    </div>
  );
};
