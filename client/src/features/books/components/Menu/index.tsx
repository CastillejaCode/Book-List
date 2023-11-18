import {
  ArrowLeftOnRectangleIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import { signOut } from "firebase/auth";
import { useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import auth from "src/auth/config";
import Dialog from "src/components/Dialog";
import { setToast } from "src/slices/notificationSlice";
import {
  setShowAddForm,
  setUser,
  toggleMenu,
  toggleSearch,
  toggleUser,
} from "src/slices/toggleSlice";
import AddForm from "../AddForm";

interface Props {
  showMenu: boolean;
}

const Menu = ({ showMenu }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const clickOutsideRef = useRef(null);
  const [user] = useAuthState(auth);

  // Only allows adding books if user is verified or if user is doing a demo and has gone over the 24 hour limit for "testing" out the app
  const verifyTimeLimit = () => {
    const timeCreated = user?.metadata.creationTime as string;
    const timeDifference = Date.now() - new Date(timeCreated).getTime();
    const timeLimit = 24 * 3600;
    if (user?.emailVerified) return false;
    return timeDifference > timeLimit;
  };

  return (
    <div
      className={`menu absolute z-50 w-fit rounded-br-md border-b-2 border-r-2 border-zinc-700 bg-zinc-100 transition-all duration-300 dark:bg-zinc-900
    ${showMenu ? "left-0" : "-left-60"}
    `}
    >
      {/* Doesn't look nice b/c had to conform to DaisyUI */}
      <ul className="menu text-xl">
        <li onClick={() => dispatch(toggleUser())}>
          <Link to="/account">
            <UserCircleIcon className="aspect-square w-6" />
            {auth.currentUser?.displayName || "Account"}
          </Link>
        </li>
        {!verifyTimeLimit() && (
          <li onClick={() => dispatch(setShowAddForm(true))}>
            <a onClick={() => dialogRef.current?.showModal()}>
              <PlusIcon className="aspect-square w-6" />
              <p>Add Book</p>
            </a>
          </li>
        )}
        <li tabIndex={0} className="mb-4">
          <button
            onClick={() => {
              dispatch(toggleSearch());
            }}
          >
            <MagnifyingGlassIcon className="aspect-square w-6" />
            Search
          </button>
        </li>
        <li>
          <a
            onClick={() => {
              signOut(auth);
              navigate("/");
              dispatch(
                setToast({ message: "Signed out", type: "notification" })
              );
              dispatch(toggleMenu());
              dispatch(setUser(false));
            }}
          >
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
