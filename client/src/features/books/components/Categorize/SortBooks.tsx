import { useDispatch } from "react-redux";
import { setSort } from "src/slices/categorizeSlicve";

export default function SortBooks() {
  const dispatch = useDispatch();

  return (
    <form className="flex flex-col gap-3">
      {/* <h2 className="text-center text-2xl underline underline-offset-4 ">
        Sort
      </h2>
      <div className="flex flex-1 flex-col justify-between gap-2">
        <label className="flex items-center justify-between gap-4 ">
          Recent
          <input
            className="radio h-5 w-5"
            type="radio"
            name="sort"
            value="recent"
            id="recent"
            defaultChecked
            onClick={() => dispatch(setSort("recent"))}
          />
        </label>
        <label
          htmlFor="title"
          className="flex items-center justify-between gap-4 "
        >
          Title
          <input
            className="radio h-5 w-5"
            type="radio"
            name="sort"
            value="title"
            id="title"
            onClick={() => dispatch(setSort("title"))}
          />
        </label>
        <label className="flex items-center justify-between gap-4 ">
          Author
          <input
            className="radio h-5 w-5"
            type="radio"
            name="sort"
            value="author"
            id="author"
            onClick={() => dispatch(setSort("author"))}
          />
        </label>
        <label className="flex items-center justify-between gap-4 ">
          Rating
          <input
            className="radio h-5 w-5"
            type="radio"
            name="sort"
            value="rating"
            id="rating"
            onClick={() => dispatch(setSort("rating"))}
          />
        </label>
      </div> */}
    </form>
  );
}
