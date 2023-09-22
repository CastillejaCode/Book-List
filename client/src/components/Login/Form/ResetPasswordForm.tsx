import { useDispatch } from "react-redux";
import { useField } from "../../../hooks/useField";
import { sendPasswordResetEmail } from "firebase/auth";
import { setToast } from "../../../features/notificationSlice";
import { FirebaseError } from "firebase/app";
import auth from "../../../auth/config";
import { toggleResetPassword } from "../../../features/toggleSlice";
import SubmitButton from "../../general/SubmitButton";

const ResetPasswordForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useField({ id: "email", type: "email" });

  const resetPassword = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email.value);
      setEmail("");
      dispatch(setToast("email sent"));
      dispatch(toggleResetPassword());
    } catch (error) {
      if (!(error instanceof FirebaseError)) return;
      dispatch(setToast(error.message));
    }
  };

  return (
    <>
      <h2 className="mb-6 text-3xl font-medium ">Reset Password</h2>
      <form onSubmit={resetPassword} className="flex w-full flex-col gap-6">
        <div className="mb-4 flex flex-col">
          <label htmlFor="email" className="dark:font-medium">
            email *
          </label>
          <input {...email} required className="input-login" />
        </div>

        <div className="flex flex-col items-center gap-4">
          <SubmitButton />
          <button
            type="button"
            className=" btn-outline btn-sm btn w-fit text-lg normal-case dark:text-red-400"
            onClick={() => dispatch(toggleResetPassword())}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default ResetPasswordForm;
