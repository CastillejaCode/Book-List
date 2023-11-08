import { useDispatch } from "react-redux";
import { setCredential } from "src/slices/userSlice";
import { toggleCreate } from "src/slices/toggleSlice";

export default function Upgrade() {
  const dispatch = useDispatch();
  const upgradeAccount = (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch(setCredential("placeholder"));
    dispatch(toggleCreate());
  };
  return (
    <form className="flex w-full flex-col">
      <div className="divider"></div>
      <div className="mb-4">
        <h2>Upgrade to email account.</h2>
        <h2>Data created will be carried over.</h2>
      </div>
      <button
        className="btn-outline btn self-end text-lg normal-case "
        onClick={upgradeAccount}
      >
        Upgrade
      </button>
    </form>
  );
}
