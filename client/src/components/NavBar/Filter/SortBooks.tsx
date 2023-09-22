import { useDispatch } from "react-redux";
import { setSort } from "src/features/sortSlice";

export default function SortBooks() {
  const dispatch = useDispatch();

  return (
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
  );
}
