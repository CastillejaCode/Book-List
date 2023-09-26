import CreateForm from "../components/Form/CreateForm";
import LoginForm from "../components/Form/Login";
import ResetPasswordForm from "../components/Form/ResetPasswordForm";
import Form from "../components/Form";
import Error from "../components/Error";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { AnimatePresence } from "framer-motion";

export default function Login() {
  const showCreate = useSelector((state: RootState) => state.toggle.create);
  const showResetPassword = useSelector(
    (state: RootState) => state.toggle.resetPassword
  );
  const error = useSelector((state: RootState) => state.notification.error);
  const notif = useSelector((state: RootState) => state.notification.notif);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      {/* Why Didn't I just make this a header instread... */}
      <h1 className="fixed top-4 text-4xl font-semibold tracking-wide dark:text-zinc-200">
        tomeTracker
      </h1>
      <Form>
        {showResetPassword ? (
          <ResetPasswordForm />
        ) : showCreate ? (
          <CreateForm />
        ) : (
          <LoginForm />
        )}
      </Form>
      <AnimatePresence>
        {error || notif ? <Error key="error" /> : ""}
      </AnimatePresence>
    </main>
  );
}
