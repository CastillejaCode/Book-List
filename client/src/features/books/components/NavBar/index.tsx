import {
  AdjustmentsHorizontalIcon,
  ArrowUturnDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Menu from "src/features/books/components/Menu";
import useClickOutside from "src/hooks/useClickOutside";
import { useAddBookMutation } from "src/services/books";
import { resetSearch, setSearch } from "src/slices/searchSlice";
import { toggleMenu, toggleSearch } from "src/slices/toggleSlice";
import { toggleUndoStatus } from "src/slices/undoSlice";
import { RootState } from "src/store";

interface Props {
  children: React.ReactNode;
}

const NavBar = ({ children }: Props) => {
  const dispatch = useDispatch();
  const [showCategorize, setShowCategorize] = useState(false);

  const showMenu = useSelector((state: RootState) => state.toggle.menu);
  const showUndo = useSelector((state: RootState) => state.undo.status);
  const showSearch = useSelector((state: RootState) => state.toggle.search);
  const searchTerm = useSelector((state: RootState) => state.search.value);
  const undoBook = useSelector((state: RootState) => state.undo.value);

  const inputRef = useRef(null);
  const clickOutsideRef = useRef<HTMLDivElement>(null);
  useClickOutside(() => setShowCategorize(false), clickOutsideRef);

  const [addBook] = useAddBookMutation();

  const addUndoBook = () => {
    addBook(undoBook);
    dispatch(toggleUndoStatus());
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="fixed top-0 z-20">
      <header
        ref={clickOutsideRef}
        className="flex w-screen flex-col  gap-2 border-b border-gray-900 bg-zinc-200 px-4 pb-2 pt-2 shadow-md dark:border-zinc-200 dark:bg-zinc-900"
      >
        <div className="flex justify-between">
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
              ${
                !showMenu && !showSearch ? "invisible -rotate-90 opacity-0" : ""
              }
              `}
            />
          </button>
          <div className="relative">
            <Link
              to="/home"
              className={`self-baseline text-3xl font-semibold tracking-wide transition-all duration-300
              ${showSearch && "invisible opacity-0"}
              `}
            >
              tomeTracker
            </Link>
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
          <button
            onClick={() => {
              setShowCategorize(!showCategorize);
            }}
          >
            <AdjustmentsHorizontalIcon
              className={clsx(
                "aspect-square w-8 transition-all duration-200",
                showCategorize && "-rotate-90"
              )}
            />
          </button>
          <button
            onClick={addUndoBook}
            className={`absolute right-16 aspect-square w-8 transition-all duration-300
              ${showUndo ? "visible opacity-100" : "invisible opacity-0"}`}
          >
            <ArrowUturnDownIcon />
          </button>
        </div>
        <div
          className={clsx("flex justify-center", !showCategorize && "hidden")}
        >
          {children}
        </div>
      </header>
      <Menu showMenu={showMenu} focusInput={focusInput} />
    </div>
  );
};

export default NavBar;
