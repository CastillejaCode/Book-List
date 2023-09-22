import FilterBooks from "./FilterBooks";
import SortBooks from "./SortBooks";

const Filter = ({ showSort }: { showSort: boolean }) => {
  return (
    <div
      className={`absolute left-1/2 -z-10 flex h-fit w-fit -translate-x-1/2 justify-around gap-20 rounded-md border-2 border-zinc-700 bg-zinc-100 p-4 shadow-md transition-all duration-300 dark:bg-zinc-800
      ${showSort ? "-bottom-56" : "bottom-2"}
      `}
    >
      <FilterBooks />
      <SortBooks />
    </div>
  );
};

export default Filter;
