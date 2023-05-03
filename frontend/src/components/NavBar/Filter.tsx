import { useDispatch } from "react-redux";
import { setSort } from "../../features/sortSlice";

const Filter = () => {
  const dispatch = useDispatch();

  return (
    <div className="absolute top-16 flex w-11/12 justify-between rounded-md border-2 border-gray-700 bg-gray-50 p-4 shadow-md">
      <div>
        <h2>Filter</h2>
      </div>
      <div>
        <h2 className="text-2xl">Sort</h2>
        <div className="flex flex-col">
          <div>
            <label htmlFor="recent">Recent</label>
            <input
              type="radio"
              name="sort"
              value="recent"
              id="recent"
              onClick={() => dispatch(setSort("recent"))}
            />
          </div>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="radio"
              name="sort"
              value="title"
              id="title"
              onClick={() => dispatch(setSort("title"))}
            />
          </div>
          <div>
            <label htmlFor="author">Author</label>
            <input
              type="radio"
              name="sort"
              value="author"
              id="author"
              onClick={() => dispatch(setSort("author"))}
            />
          </div>
          <div>
            <label htmlFor="rating">Rating</label>
            <input
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
