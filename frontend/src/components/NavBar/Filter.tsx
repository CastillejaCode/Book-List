import { useDispatch } from "react-redux";
import { setSort, toggleNotRead, toggleRead } from "../../features/sortSlice";
import { useState } from "react";

const Filter = ({ showSort }: { showSort: boolean }) => {
  const dispatch = useDispatch();
  const [read, setRead] = useState(true);
  const [notRead, setNotRead] = useState(false);

  return (
    <div
      className={`absolute left-1/2 -z-10 flex h-fit w-fit -translate-x-1/2 justify-around gap-20 rounded-md border-2 border-gray-700 bg-gray-50 p-4 shadow-md transition-all duration-300
      ${showSort ? "-bottom-56" : "bottom-2"}
      `}
    >
      <div>
        <h2 className="text-center text-2xl ">Filter</h2>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-lg">
            <label htmlFor="read">Read</label>
            <input
              className="checkbox "
              type="checkbox"
              id="all"
              defaultChecked={read}
              onClick={() => dispatch(toggleRead())}
            />
          </div>
          <div className="flex items-center justify-between gap-2 text-lg">
            <label htmlFor="not-read">Not read</label>
            <input
              className="checkbox h-5 w-5"
              type="checkbox"
              value="title"
              id="not-read"
              onClick={() => dispatch(toggleNotRead())}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <h2 className="text-center text-2xl ">Sort</h2>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-lg">
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
          <div className="flex items-center justify-between gap-2 text-lg">
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
          <div className="flex items-center justify-between gap-2 text-lg">
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
          <div className="flex items-center justify-between gap-2 text-lg">
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
