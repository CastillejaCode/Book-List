import clsx from "clsx";
import React, { SetStateAction } from "react";
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
    localStorage.setItem("sort", value);
  };

  const handleFilter = (event: React.FormEvent<HTMLSelectElement>) => {
    const value = event.currentTarget.value as Filter;
    setState.setFilter(value);
    localStorage.setItem("filter", value);
  };

  const handleOrder = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.checked as Order;
    setState.setOrder(value);
    localStorage.setItem("order", value ? "true" : "");
  };

  return (
    <form className="top-20 flex w-full max-w-sm items-center justify-between gap-4 lg:absolute">
      <select
        className="select w-full max-w-xs"
        value={state.sort}
        onChange={handleSort}
      >
        <option disabled>Sort</option>
        <option>Title</option>
        <option>Author</option>
        <option>Rating</option>
        <option>Date</option>
      </select>
      <div className="flex flex-col items-center gap-2">
        <label htmlFor="toggle" className={clsx(state.order && "font-bold")}>
          Asc.
        </label>
        <input
          type="checkbox"
          id="toggle"
          className="toggle"
          onChange={handleOrder}
          checked={state.order}
        />
        <label htmlFor="toggle" className={clsx(!state.order && "font-bold")}>
          Desc.
        </label>
      </div>
      <select
        className="select w-full max-w-xs"
        value={state.filter}
        onChange={handleFilter}
      >
        <option disabled>Filter</option>
        <option>All</option>
        <option>Read</option>
        <option>Not Read</option>
      </select>
    </form>
  );
}
