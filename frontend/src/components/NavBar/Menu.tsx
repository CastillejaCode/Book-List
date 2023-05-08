import {
  PlusIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleMenu,
  toggleModal,
  toggleSearch,
} from "../../features/toggleSlice";
import { setUID } from "../../features/userSlice";
import { RootState } from "../../store";
import { signOut } from "firebase/auth";
import auth from "../../auth/config";

interface Props {
  showMenu: boolean;
  focusInput: () => void;
}

const Menu = ({ showMenu, focusInput }: Props) => {
  const dispatch = useDispatch();
  const name = useSelector((state: RootState) => state.user.name);
  return (
    <div
      className={`menu absolute z-50 w-fit rounded-br-md border-b-2 border-r-2 border-gray-900 bg-base-100 transition-all duration-300
    ${showMenu ? "left-0" : "-left-60"}
    `}
    >
      <ul className="menu text-xl">
        <li>
          <a>
            <UserCircleIcon className="aspect-square w-6" />
            {name}
          </a>
        </li>
        <li onClick={() => dispatch(toggleModal())}>
          <a>
            <PlusIcon className="aspect-square w-6" />
            <p>Add Book</p>
          </a>
        </li>
        <li tabIndex={0} className="mb-4">
          <a
            onClick={() => {
              dispatch(toggleSearch());
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
              signOut(auth)
                .then(() => {
                  dispatch(setUID(""));
                })
                .catch((error) => {
                  // An error happened.
                });

              dispatch(toggleMenu());
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
