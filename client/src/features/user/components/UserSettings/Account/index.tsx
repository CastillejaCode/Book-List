import { AuthError, updateEmail, updateProfile } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import auth from "src/auth/config";
import { useField } from "src/hooks/useField";
import { setToast } from "src/slices/toastSlice";
import Verify from "./Verify";
interface Props {
  handleName: React.Dispatch<string>;
}

const Account = ({ handleName }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user] = useAuthState(auth);
  const [name, setNameValue] = useField({
    id: "name",
    type: "text",
  });
  const [email, setEmailValue] = useField({
    id: "email",
    type: "email",
  });

  const signUp = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!user) return;
    navigate("/");
  };

  const changeAccount = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!user) return;
    try {
      if (name.value) {
        await updateProfile(user, { displayName: name.value });
        handleName(name.value);
        setNameValue("");
        dispatch(setToast({ message: "name changed" }));
      }
      if (email.value) {
        await updateEmail(user, email.value);
        setEmailValue("");
        dispatch(setToast({ message: "email changed" }));
      }
      if (email.value && name.value) {
        dispatch(setToast({ message: "name and email changed" }));
      }
    } catch (error) {
      const { message } = error as AuthError;
      dispatch(setToast({ message, type: "error" }));
    }
  };

  return (
    <div className="flex w-full max-w-xs flex-col items-center gap-4">
      {user?.isAnonymous ? (
        <div className="flex flex-col gap-2">
          <p>Sign up for an account. </p>
          <p>You will be taken to the login page.</p>
          <p>Data created will be saved.</p>
        </div>
      ) : (
        <h2>Make changes to your account.</h2>
      )}
      <form
        className="flex w-full flex-col gap-6 p-0"
        onSubmit={user?.isAnonymous ? signUp : changeAccount}
      >
        {!user?.isAnonymous && (
          <>
            <label className="flex flex-col">
              First name
              <input {...name} className="input-login" />
            </label>
            <label className=" flex flex-col">
              Email
              <input {...email} className="input-login" />
            </label>
          </>
        )}
        <button
          className="btn self-end bg-green-200 text-green-900"
          type="submit"
        >
          {user?.isAnonymous ? "Sign up" : "Save Changes"}
        </button>
      </form>
      {!user?.emailVerified && !user?.isAnonymous && <Verify />}
    </div>
  );
};

export default Account;
