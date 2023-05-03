import { PlusIcon } from "@heroicons/react/20/solid";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../features/toggleSlice";

const Menu = ({ showMenu }: { showMenu: boolean }) => {
  const dispatch = useDispatch();
  return (
    <div
      className={`menu absolute z-50 w-56 rounded-br-md border-b-2 border-r-2 border-gray-900 bg-base-100 transition-all duration-300
    ${showMenu ? "left-0" : "-left-60"}
    `}
    >
      <ul>
        <li>
          <button
            className="flex align-baseline"
            onClick={() => dispatch(toggleModal())}
          >
            <PlusIcon className="aspect-square w-6" /> <p>Add Book</p>
          </button>
        </li>
        <li>
          <a>Item 2</a>
        </li>
        <li>
          <a>Item 3</a>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
