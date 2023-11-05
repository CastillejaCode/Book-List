import UserSettings from "../components/UserSettings";
import NavBar from "src/features/books/components/NavBar";

export default function Account() {
  return (
    <>
      <NavBar />
      <main className="grid min-h-screen place-content-center">
        <UserSettings />
      </main>
    </>
  );
}
