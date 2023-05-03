import {
  Bars3Icon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/solid";
import Filter from "./Filter";

const NavBar = () => {
  return (
    <div className="relative">
      <header className="sticky mb-36 flex w-screen items-center justify-between border-b-2 border-gray-900 bg-gray-200 px-4 pb-2 pt-2 shadow-md">
        <Bars3Icon className="aspect-square w-10" />
        <h1 className="self-baseline text-3xl font-semibold tracking-wide">
          BookL:
        </h1>
        <button>
          <AdjustmentsHorizontalIcon className="aspect-square w-9" />
        </button>
      </header>
      <Filter />
    </div>
  );
};

export default NavBar;
