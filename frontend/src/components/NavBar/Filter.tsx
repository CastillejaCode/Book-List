import { useDispatch } from "react-redux";
import { setSort } from "../../features/sortSlice";

const Filter = ({ showSort }: { showSort: boolean }) => {
  const dispatch = useDispatch();

  return (
    <div
      className={`absolute  left-1/2 -z-10 flex h-60 w-11/12 -translate-x-1/2 justify-around rounded-md border-2 border-gray-700 bg-gray-50 p-4 shadow-md transition-all duration-300
      ${showSort ? "-bottom-64" : "bottom-2"}
      `}
    >
      <div>
        <h2 className="mb-2 text-center text-3xl font-semibold">Filter</h2>
      </div>
      <div className="flex flex-col">
        <h2 className="mb-4 text-center text-3xl font-semibold">Sort</h2>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xl">
            <label htmlFor="recent">Recent</label>
            <input
              className="radio h-5 w-5"
              type="radio"
              name="sort"
              value="recent"
              id="recent"
              defaultChecked
              onClick={() => dispatch(setSort("recent"))}
            />
          </div>
          <div className="flex items-center justify-between gap-2 text-xl">
            <label htmlFor="title">Title</label>
            <input
              className="radio h-5 w-5"
              type="radio"
              name="sort"
              value="title"
              id="title"
              onClick={() => dispatch(setSort("title"))}
            />
          </div>
          <div className="flex items-center justify-between gap-2 text-xl">
            <label htmlFor="author">Author</label>
            <input
              className="radio h-5 w-5"
              type="radio"
              name="sort"
              value="author"
              id="author"
              onClick={() => dispatch(setSort("author"))}
            />
          </div>
          <div className="flex items-center justify-between gap-2 text-xl">
            <label htmlFor="rating">Rating</label>
            <input
              className="radio h-5 w-5"
              type="radio"
              name="sort"
              value="rating"
              id="rating"
              onClick={() => dispatch(setSort("rating"))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
