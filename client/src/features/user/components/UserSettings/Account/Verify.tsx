import { sendEmailVerification } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "src/auth/config";
import useToast from "src/hooks/useToast";
import checkVerification from "src/utils/checkVerification";

export default function Verify() {
  const { addToast } = useToast();
  const [user] = useAuthState(auth);

  const verifyEmail = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!user) return;
    try {
      if (user.emailVerified) throw Error("email already verified");
      await sendEmailVerification(user);
      checkVerification(2, 60);
      addToast({ message: "email sent" });
    } catch (error) {
      if (error instanceof Error) {
        const { message } = error;
        addToast({ type: "error", message });
      }
    }
  };

  return (
    <form className=" flex w-full flex-col gap-4" onSubmit={verifyEmail}>
      <div className="divider my-0"></div>
      <div className=" w-fit">
        <h2>Verify email account.</h2>
        <h2>Allow adding books after 24 hours.</h2>
      </div>
      <button className="btn-outline btn self-end text-lg normal-case ">
        Verify
      </button>
    </form>
  );
}
