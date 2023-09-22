import {
  Bars3Icon,
  AdjustmentsHorizontalIcon,
  XMarkIcon,
  ArrowUturnDownIcon,
} from "@heroicons/react/24/solid";
import Filter from "./Filter";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleMenu,
  toggleSearch,
  toggleSort,
} from "../../features/toggleSlice";
import { RootState } from "../../store";
import Menu from "./Menu";
import { useAddBookMutation } from "../../services/books";
import { toggleUndoStatus } from "../../features/undoSlice";
import { useRef } from "react";
import { resetSearch, setSearch } from "../../features/searchSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const showSort = useSelector((state: RootState) => state.toggle.sort);
  const showMenu = useSelector((state: RootState) => state.toggle.menu);
  const showUndo = useSelector((state: RootState) => state.undo.status);
  const showSearch = useSelector((state: RootState) => state.toggle.search);

  const inputRef = useRef(null);

  const [addBook] = useAddBookMutation();
  const undoBook = useSelector((state: RootState) => state.undo.value);
  const searchTerm = useSelector((state: RootState) => state.search.value);

  const addUndoBook = () => {
    addBook(undoBook);
    dispatch(toggleUndoStatus());
  };

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div className="fixed top-0 z-20">
      <header className="sticky flex w-screen items-center justify-between border-b border-gray-900 bg-zinc-200 px-4 pb-2 pt-2 shadow-md dark:border-zinc-200 dark:bg-zinc-900">
        <button
          onClick={() => {
            dispatch(resetSearch());
            if (showSearch) dispatch(toggleSearch());
            else dispatch(toggleMenu());
          }}
          className="relative"
        >
          <Bars3Icon
            className={` aspect-square w-10 transition-all duration-300 
            ${showMenu || showSearch ? "invisible rotate-90 opacity-0" : ""}`}
          />
          <XMarkIcon
            className={`absolute left-0 top-0 aspect-square w-10 transition-all duration-300 
            ${!showMenu && !showSearch ? "invisible -rotate-90 opacity-0" : ""}
            `}
          />
        </button>
        <div className="relative">
          <h1
            className={`self-baseline text-3xl font-semibold tracking-wide transition-all duration-300
            ${showSearch && "invisible opacity-0"}
            `}
          >
            tomeTracker
          </h1>
          <input
            onChange={(event) => dispatch(setSearch(event.target.value))}
            value={searchTerm}
            type="text"
            ref={inputRef}
            className={`w- input-bordered input absolute left-1/2 top-0 h-full w-52 -translate-x-1/2 text-lg transition-all duration-300
            ${!showSearch && "invisible opacity-0"}
            `}
          />
        </div>
        <button onClick={() => dispatch(toggleSort())}>
          <AdjustmentsHorizontalIcon
            className={`aspect-square w-8 transition-all duration-300 ${
              showSort && "-rotate-90"
            }`}
          />
        </button>
        <button
          onClick={addUndoBook}
          className={`absolute right-16 aspect-square w-8 transition-all duration-300 
            ${showUndo ? "visible opacity-100" : "invisible opacity-0"}`}
        >
          <ArrowUturnDownIcon />
        </button>
      </header>
      <Menu showMenu={showMenu} focusInput={focusInput} />
      <Filter showSort={showSort} />
    </div>
  );
};

export default NavBar;
