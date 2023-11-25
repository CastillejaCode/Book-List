import NavBar from "src/features/books/components/NavBar";
import UserSettings from "../components/UserSettings";
import Toast from "src/components/ui/Toast";

export default function Account() {
  return (
    <>
      <NavBar />
      <main className="grid place-content-center">
        <UserSettings />
      </main>
      <Toast />
    </>
  );
}
