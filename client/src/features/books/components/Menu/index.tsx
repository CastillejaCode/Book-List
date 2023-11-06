import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import auth from "src/auth/config";
import {
  setUser,
  toggleMenu,
  toggleModal,
  toggleSearch,
  toggleUser,
} from "src/slices/toggleSlice";
import {
  ArrowLeftOnRectangleIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";

interface Props {
  showMenu: boolean;
  focusInput: () => void;
}

const Menu = ({ showMenu, focusInput }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  if (!user) return <></>;

  // Only allows adding books if user is verified or if user is doing a demo and has gone over the 24 hour limit for "testing" out the app
  const verifyTimeLimit = () => {
    const timeCreated = user.metadata.creationTime as string;
    const timeDifference = Date.now() - new Date(timeCreated).getTime();
    const timeLimit = 24 * 3600;
    if (user.emailVerified) return false;
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
          <li onClick={() => dispatch(toggleModal())}>
            <a>
              <PlusIcon className="aspect-square w-6" />
              <p>Add Book</p>
            </a>
          </li>
        )}
        <li tabIndex={0} className="mb-4">
          <a
            onClick={() => {
              dispatch(toggleSearch());
              // Janky way of waiting for input element to exist before focusing on it
              setTimeout(() => {
                focusInput();
              }, 50);
            }}
          >
            <MagnifyingGlassIcon className="aspect-square w-6" />
            Search
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              signOut(auth);
              navigate("/");
              dispatch(toggleMenu());
              dispatch(setUser(false));
            }}
          >
            <ArrowLeftOnRectangleIcon className="aspect-square w-6" />
            Sign Out
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
