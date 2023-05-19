import { useField } from "../../hooks/useField";
import {
  getAuth,
  sendEmailVerification,
  updateEmail,
  updateProfile,
} from "firebase/auth";
import auth from "../../auth/config";

interface Props {
  handleName: React.Dispatch<string>;
}

const Account = ({ handleName }: Props) => {
  const { setValue: setNameValue, ...name } = useField("name", "text");
  const { setValue: setEmailValue, ...email } = useField("email", "text");

  const changeAccount = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!auth.currentUser) return;
    if (name.value) {
      updateProfile(auth.currentUser, { displayName: name.value }).then(() => {
        handleName(name.value);
        setNameValue("");
      });
    }
    if (email.value) {
      updateEmail(auth.currentUser, email.value).then(() => {
        sendEmailVerification(auth.currentUser)
          .then(() => setEmailValue(""))
          .catch((error) => console.log(error));
      });
    }
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
        <button className="btn self-end border-0 bg-green-200 text-lg normal-case text-green-900">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Account;
