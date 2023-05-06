import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useDispatch } from "react-redux";
import { toggleModal, toggleSearch } from "../../features/toggleSlice";

interface Props {
  showMenu: boolean;
  focusInput: () => void;
}

const Menu = ({ showMenu, focusInput }: Props) => {
  const dispatch = useDispatch();
  return (
    <div
      className={`menu absolute z-50 w-fit rounded-br-md border-b-2 border-r-2 border-gray-900 bg-base-100 transition-all duration-300
    ${showMenu ? "left-0" : "-left-60"}
    `}
    >
      <ul className="menu text-xl">
        <li onClick={() => dispatch(toggleModal())}>
          <a>
            <PlusIcon className="aspect-square w-6" />
            <p>Add Book</p>
          </a>
        </li>
        <li tabIndex={0}>
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
      </ul>
    </div>
  );
};

export default Menu;
