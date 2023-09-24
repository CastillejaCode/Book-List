import { useDispatch } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { sendEmailVerification } from "firebase/auth";
import auth from "src/auth/config";
import { setToast } from "src/slices/notificationSlice";
import useCheckVerify from "src/hooks/useCheckVerify";

export default function Verify() {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const checkVerify = useCheckVerify();

  const verifyEmail = async (event: React.SyntheticEvent) => {
    if (!user) return;
    event.preventDefault();
    try {
      if (user.emailVerified) throw Error("email already verified");
      await sendEmailVerification(user);
      dispatch(setToast("email sent"));
      checkVerify.start();
    } catch (error) {
      if (error instanceof Error) dispatch(setToast(error.message));
    }
  };

  return (
    <form className=" flex w-full flex-col" onSubmit={verifyEmail}>
      <div className="divider"></div>
      <div className="mb-4 w-fit">
        <h2>Verify email account.</h2>
        <h2>Allow adding books after 24 hours.</h2>
      </div>
      <button className="btn-outline btn self-end text-lg normal-case ">
        Verify
      </button>
    </form>
  );
}
