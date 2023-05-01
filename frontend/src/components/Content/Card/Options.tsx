import { useDeleteBookMutation } from "../../../services/books";

const Options = ({ id }: { id: string }) => {
  const [deleteBook] = useDeleteBookMutation();

  return (
    <div className="relative flex justify-center gap-20">
      <button
        className="rounded-md border-2 border-gray-700 px-2 py-1 font-semibold"
        onClick={() => {
          deleteBook(id);
        }}
      >
        Delete
      </button>
      <button className="relative z-50 rounded-md border-2 border-gray-700 px-2 py-1 font-semibold">
        Edit
      </button>
    </div>
  );
};

export default Options;
