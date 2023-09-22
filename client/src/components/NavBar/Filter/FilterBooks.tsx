import { useDispatch } from "react-redux";
import { useState } from "react";
import { toggleNotRead, toggleRead } from "src/features/sortSlice";

export default function FilterBooks() {
  const dispatch = useDispatch();
  const [read, setRead] = useState(true);

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-center text-2xl underline underline-offset-4">
        Filter
      </h2>
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
  );
}
