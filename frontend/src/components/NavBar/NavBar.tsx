import {
  Bars3Icon,
  AdjustmentsHorizontalIcon,
  XMarkIcon,
  ArrowUturnDownIcon,
} from "@heroicons/react/24/solid";
import Filter from "./Filter";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu, toggleSort } from "../../features/toggleSlice";
import { RootState } from "../../store";
import Menu from "./Menu";
import { useAddBookMutation } from "../../services/books";
import { toggleUndoStatus } from "../../features/undoSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const showSort = useSelector((state: RootState) => state.toggle.sort);
  const showMenu = useSelector((state: RootState) => state.toggle.menu);
  const showUndo = useSelector((state: RootState) => state.undo.status);

  const undoBook = useSelector((state: RootState) => state.undo.value);
  const [addBook] = useAddBookMutation();

  const addUndoBook = () => {
    addBook(undoBook);
    dispatch(toggleUndoStatus());
  };

  return (
    <div className="fixed top-0 z-20">
      <header className="sticky flex w-screen items-center justify-between border-b-2 border-gray-900 bg-gray-200 px-4 pb-2 pt-2 shadow-md">
        <button onClick={() => dispatch(toggleMenu())} className="relative">
          <Bars3Icon
            className={` aspect-square w-10 transition-all duration-300 
            ${showMenu ? "invisible rotate-90 opacity-0" : ""}`}
          />
          <XMarkIcon
            className={`absolute left-0 top-0 aspect-square w-10 transition-all duration-300 
            ${!showMenu ? "invisible -rotate-90 opacity-0" : ""}`}
          />
        </button>
        <h1 className="self-baseline text-3xl font-semibold tracking-wide">
          BookL:
        </h1>
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
      <Menu showMenu={showMenu} />
      <Filter showSort={showSort} />
    </div>
  );
};

export default NavBar;
