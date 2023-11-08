import CheckAuth from "src/components/Error/CheckAuth";
import UserSettings from "../components/UserSettings";

export default function Account() {
  return (
    <CheckAuth>
      <main className="grid min-h-screen place-content-center">
        <UserSettings />
      </main>
    </CheckAuth>
  );
}
