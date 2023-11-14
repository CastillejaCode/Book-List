import { SetStateAction } from "react";
import { Filter, Order, Sort } from "src/types";

interface Props {
  state: { sort: Sort; filter: Filter; order: Order };
  setState: {
    setSort: React.Dispatch<SetStateAction<Sort>>;
    setFilter: React.Dispatch<SetStateAction<Filter>>;
    setOrder: React.Dispatch<SetStateAction<Order>>;
  };
}

export default function Categorize({ state, setState }: Props) {
  const handleSort = (event: React.FormEvent<HTMLSelectElement>) => {
    const value = event.currentTarget.value as Sort;
    setState.setSort(value);
  };

  const handleFilter = (event: React.FormEvent<HTMLSelectElement>) => {
    const value = event.currentTarget.value as Filter;
    setState.setFilter(value);
  };

  return (
    <form className="flex w-full justify-between gap-4">
      <select
        className="select w-full max-w-xs"
        value={state.sort}
        onChange={handleSort}
      >
        <option disabled selected>
          Sort
        </option>
        <option>Title</option>
        <option>Author</option>
        <option>Rating</option>
        <option>Date</option>
      </select>
      <input type="checkbox" className="toggle" checked />
      <select
        className="select w-full max-w-xs"
        value={state.filter}
        onChange={handleFilter}
      >
        <option disabled selected>
          Filter
        </option>
        <option>All</option>
        <option>Read</option>
        <option>Not Read</option>
      </select>
    </form>
  );
}

// <div
//   className={`absolute left-1/2 -z-10 flex h-fit w-fit -translate-x-1/2 justify-around gap-20 rounded-md border-2 border-zinc-700 bg-zinc-100 p-4 shadow-md transition-all duration-300 dark:bg-zinc-800
//   ${showSort ? "-bottom-56" : "bottom-2"}
//   `}
// >
//   <FilterBooks />
//   <SortBooks />
// </div>
