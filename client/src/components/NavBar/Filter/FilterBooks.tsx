import { useDispatch } from "react-redux";
import { setRead } from "src/features/sortSlice";

export default function FilterBooks() {
  const dispatch = useDispatch();

  return (
    <form className="flex flex-col gap-3">
      <h2 className="text-center text-2xl underline underline-offset-4">
        Filter
      </h2>
      <div className="flex flex-1 flex-col justify-between">
        <label className="flex items-center justify-between gap-4">
          Read
          <input
            className="radio h-5 w-5 "
            type="radio"
            name="filter"
            defaultChecked
            onClick={() => dispatch(setRead(true))}
          />
        </label>
        <label className="flex items-center justify-between gap-4">
          Not read
          <input
            className="radio h-5 w-5"
            type="radio"
            name="filter"
            onClick={() => dispatch(setRead(false))}
          />
        </label>
        <label className="flex items-center justify-between gap-4">
          All
          <input
            className="radio h-5 w-5"
            type="radio"
            name="filter"
            value="all"
            onClick={() => dispatch(setRead(null))}
          />
        </label>
      </div>
    </form>
  );
}
