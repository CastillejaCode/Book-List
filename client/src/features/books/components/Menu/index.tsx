import {
  ArrowLeftOnRectangleIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import { signOut } from "firebase/auth";
import { SetStateAction, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import auth from "src/auth/config";
import Dialog from "src/components/Dialog";
import { setToast } from "src/slices/notificationSlice";
import { setUser } from "src/slices/toggleSlice";
import AddForm from "../AddForm";

interface Props {
  showMenu: boolean;
  setShowMenu: React.Dispatch<SetStateAction<boolean>>;
  setShowSearch: React.Dispatch<SetStateAction<boolean>>;
}

const Menu = ({ showMenu, setShowMenu, setShowSearch }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [user] = useAuthState(auth);

  // Only allows adding books if user is verified or if user is doing a demo and has gone over the 24 hour limit for "testing" out the app
  const verifyTimeLimit = () => {
    const timeCreated = user?.metadata.creationTime as string;
    const timeDifference = Date.now() - new Date(timeCreated).getTime();
    const timeLimit = 24 * 3600;
    if (user?.emailVerified) return false;
    return timeDifference > timeLimit;
  };

  const handleSearch = () => {
    setShowMenu(false);
    setShowSearch(true);
  };

  const handleSignOut = () => {
    signOut(auth);
    navigate("/");
    dispatch(setToast({ message: "Signed out", type: "notification" }));
    setShowMenu(false);
    dispatch(setUser(false));
  };

  return (
    <div
      className={`menu absolute top-16 z-50 w-fit rounded-br-md border-b-2 border-r-2 border-zinc-700 bg-zinc-100 transition-all duration-300 dark:bg-zinc-900
    ${showMenu ? "left-0" : "-left-60"}
    `}
    >
      {/* Doesn't look nice b/c had to conform to DaisyUI */}
      <ul className="menu text-xl">
        <li>
          <Link to="/account">
            <UserCircleIcon className="aspect-square w-6" />
            {auth.currentUser?.displayName ?? "Account"}
          </Link>
        </li>
        {!verifyTimeLimit() && (
          <li>
            <a onClick={() => dialogRef.current?.showModal()}>
              <PlusIcon className="aspect-square w-6" />
              <p>Add Book</p>
            </a>
          </li>
        )}
        <li tabIndex={0} className="mb-4">
          <button onClick={handleSearch}>
            <MagnifyingGlassIcon className="aspect-square w-6" />
            Search
          </button>
        </li>
        <li>
          <a onClick={handleSignOut}>
            <ArrowLeftOnRectangleIcon className="aspect-square w-6" />
            Sign Out
          </a>
        </li>
      </ul>
      <Dialog ref={dialogRef}>
        <AddForm />
      </Dialog>
    </div>
  );
};

export default Menu;
