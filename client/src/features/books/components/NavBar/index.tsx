import {
  AdjustmentsHorizontalIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Menu from "src/features/books/components/Menu";
import useExit from "src/hooks/useExit";
import { setSearch } from "src/slices/searchSlice";
import { RootState } from "src/store";

interface Props {
  children?: React.ReactNode;
}

const NavBar = ({ children }: Props) => {
  const dispatch = useDispatch();

  const searchTerm = useSelector((state: RootState) => state.search.value);

  const [showCategorize, setShowCategorize] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const clickOutsideRef = useRef<HTMLDivElement>(null);
  const handleExit = () => {
    setShowCategorize(false);
    setShowSearch(false);
    setShowMenu(false);
  };

  // Executes action when clicking outside ref or hitting the escape key
  useExit(handleExit, clickOutsideRef);

  const handleMenu = () => {
    if (!showMenu && showSearch) {
      dispatch(setSearch(""));
      setShowSearch(false);
    } else setShowMenu(!showMenu);
  };

  return (
    <div className="sticky top-0 z-10">
      <header
        ref={clickOutsideRef}
        className="flex w-screen flex-col border-b border-gray-900 bg-zinc-200 px-4 py-2 shadow-md dark:border-zinc-200 dark:bg-zinc-900"
      >
        <div className="flex justify-between ">
          <button onClick={handleMenu} className="relative">
            <Bars3Icon
              className={` aspect-square w-10 transition-all duration-300
              ${(showMenu || showSearch) && "invisible rotate-90 opacity-0"}`}
            />
            <XMarkIcon
              className={`absolute left-0 top-0 aspect-square w-10 transition-all duration-300
              ${!(showMenu || showSearch) && "invisible -rotate-90 opacity-0"}
              `}
            />
          </button>
          <div className="relative">
            {!showSearch && (
              <Link
                to="/home"
                className={`self-baseline text-3xl font-semibold tracking-wide transition-all duration-300`}
              >
                tomeTracker
              </Link>
            )}
            {showSearch && (
              <input
                onChange={(event) => dispatch(setSearch(event.target.value))}
                value={searchTerm}
                type="text"
                autoFocus={true}
                className={`w- input-bordered input absolute left-1/2 top-0 h-full w-52 -translate-x-1/2 text-lg transition-all duration-300`}
              />
            )}
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
        </div>
        <div
          className={clsx("flex justify-center", !showCategorize && "hidden")}
        >
          {children}
        </div>
      </header>
      <Menu
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        setShowSearch={setShowSearch}
      />
    </div>
  );
};

export default NavBar;
