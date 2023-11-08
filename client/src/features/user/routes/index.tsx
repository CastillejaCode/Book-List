import NavBar from "src/features/books/components/NavBar";
import UserSettings from "../components/UserSettings";

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
