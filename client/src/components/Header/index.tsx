import { Link } from "react-router-dom";
import LoginForm from "src/features/login/components/Form/Login";

export default function Header() {
  return (
    <header className="flex items-baseline justify-between p-4">
      <Link
        to="/"
        className="text-2xl font-medium tracking-wide dark:text-zinc-200"
      >
        tomeTracker
      </Link>
      <div className="flex gap-4">
        <LoginForm />
        <button>Sign up </button>
      </div>
    </header>
  );
}
