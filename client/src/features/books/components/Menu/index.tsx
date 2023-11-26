import {
  ArrowLeftOnRectangleIcon,
  ArrowUturnDownIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import { signOut } from "firebase/auth";
import { SetStateAction, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "src/auth/config";
import Dialog from "src/components/function/Dialog";
import { useAddBookMutation } from "src/services/books";
import { setToast } from "src/slices/toastSlice";
import { setUser } from "src/slices/toggleSlice";
import { saveUndo } from "src/slices/undoSlice";
import { RootState } from "src/store";
import AddForm from "../AddForm";

interface Props {
  showMenu: boolean;
  setShowMenu: React.Dispatch<SetStateAction<boolean>>;
  setShowSearch: React.Dispatch<SetStateAction<boolean>>;
}

const Menu = ({ showMenu, setShowMenu, setShowSearch }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [addBook, { isError }] = useAddBookMutation();

  const dialogRef = useRef<HTMLDialogElement>(null);
  const [user] = useAuthState(auth);

  const undoBook = useSelector((state: RootState) => state.undo.value);

  // Only allows adding books if user is verified or if user is doing a demo and has gone over the 24 hour limit for "testing" out the app
  const timeLimitBreached = () => {
    const timeCreated = user?.metadata.creationTime as string;
    const timeDifference = Date.now() - new Date(timeCreated).getTime();
    const timeLimit = 24 * 3600 * 1000;
    if (user?.emailVerified) return false;
    return timeDifference > timeLimit;
  };

  const handleOpenAddbook = () => {
    dialogRef.current?.showModal();
    setShowMenu(false);
  };

  const handleSearch = () => {
    setShowSearch(true);
    setShowMenu(false);
  };

  const handleSignOut = () => {
    signOut(auth);
    navigate("/");
    dispatch(setToast({ message: "Signed out", type: "notification" }));
    setShowMenu(false);
    dispatch(setUser(false));
  };

  const handleUndo = async () => {
    try {
      if (!undoBook) throw new Error("Can't find book to undelete");
      await addBook(undoBook);
      if (isError) throw new Error("Couldn't undo deletion");
      dispatch(saveUndo(null));
    } catch (err) {
      if (err instanceof Error) {
        const { message } = err;
        dispatch(setToast({ type: "error", message }));
      }
    }
  };

  return (
    <div
      className={`menu absolute w-fit rounded-br-md border-b-2 border-r-2 border-zinc-700 bg-zinc-100 transition-all duration-200 dark:bg-zinc-900
    ${showMenu ? "left-0" : "invisible -left-60"}
    `}
    >
      <ul className="menu text-xl">
        {location.pathname !== "/account" && (
          <li>
            <Link to="/account">
              <UserCircleIcon className="aspect-square w-6" />
              {auth.currentUser?.displayName ?? "Account"}
            </Link>
          </li>
        )}
        {location.pathname !== "/home" && (
          <li>
            <Link to="/home">
              <BookOpenIcon className="aspect-square w-6" />
              Books
            </Link>
          </li>
        )}
        {!timeLimitBreached() && (
          <li>
            <a onClick={handleOpenAddbook}>
              <PlusIcon className="aspect-square w-6" />
              <p>Add Book</p>
            </a>
          </li>
        )}
        <li tabIndex={0}>
          <button onClick={handleSearch}>
            <MagnifyingGlassIcon className="aspect-square w-6" />
            Search
          </button>
        </li>
        <li className="mt-4">
          <button onClick={handleSignOut}>
            <ArrowLeftOnRectangleIcon className="aspect-square w-6" />
            Sign Out
          </button>
        </li>
        {undoBook && (
          <li className="mt-4">
            <button onClick={handleUndo} aria-label="Undelete book">
              <ArrowUturnDownIcon className="aspect-square w-6" />
              Undo
            </button>
          </li>
        )}
      </ul>
      <Dialog ref={dialogRef}>
        <AddForm />
      </Dialog>
    </div>
  );
};

export default Menu;
