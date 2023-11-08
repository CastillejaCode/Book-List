import { Toast } from "@radix-ui/react-toast";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import Form from "../components/Form";
import CreateForm from "../components/Form/CreateForm";
import LoginForm from "../components/Login";
import ResetPasswordForm from "../components/Login/PasswordForm";

export default function Login() {
  const showCreate = useSelector((state: RootState) => state.toggle.create);
  const showResetPassword = useSelector(
    (state: RootState) => state.toggle.resetPassword
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
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
      <Toast />
    </main>
  );
}
