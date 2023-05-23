import { useField } from "../../hooks/useField";
import {
  sendEmailVerification,
  updateEmail,
  updateProfile,
} from "firebase/auth";
import auth from "../../auth/config";
import { useDispatch } from "react-redux";
import { setCredential } from "../../features/userSlice";
import { toggleCreate } from "../../features/toggleSlice";
import { useAuthState } from "react-firebase-hooks/auth";

interface Props {
  handleName: React.Dispatch<string>;
}

const Account = ({ handleName }: Props) => {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const { setValue: setNameValue, ...name } = useField("name", "text");
  const { setValue: setEmailValue, ...email } = useField("email", "text");

  const changeAccount = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!user) return;
    if (name.value) {
      await updateProfile(user, { displayName: name.value });
      handleName(name.value);
      setNameValue("");
    }
    if (email.value) {
      await updateEmail(user, email.value);
      sendEmailVerification(user)
        .then(() => setEmailValue(""))
        .catch((error) => console.log(error));
    }
  };

  const upgradeAccount = (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch(setCredential("placeholder"));
    dispatch(toggleCreate());
  };

  return (
    <div className="flex w-fit flex-col items-center gap-4">
      <div className="w-full">
        <h2>Make changes to your account here.</h2>
      </div>
      <form className="flex w-full flex-col gap-6 p-0" onSubmit={changeAccount}>
        <div className="flex flex-col">
          <label htmlFor="name">first name</label>
          <input
            {...name}
            className="input-sm rounded-sm border border-gray-700 text-lg"
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="email">email</label>
          <input
            {...email}
            className="input-sm rounded-sm border border-gray-700 text-lg"
          />
        </div>
        <button
          className="btn self-end border-0 bg-green-200 text-lg normal-case text-green-900"
          type="submit"
        >
          Save Changes
        </button>
      </form>
      {auth.currentUser?.isAnonymous && (
        <form className=" flex w-full flex-col">
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
      )}
    </div>
  );
};

export default Account;
