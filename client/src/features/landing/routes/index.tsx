import Footer from "src/components/ui/Footer";
import Header from "src/components/ui/Header";
import Toast from "src/components/ui/Toast";
import AnonLogin from "src/features/login/components/AnonLogin";
import SignUp from "src/features/login/components/SignUp";

export default function Landing() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center gap-10 p-8">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-center text-5xl font-semibold lg:text-7xl">
            Remember the stories
          </h1>
          <h2 className="text-xl lg:text-3xl">
            Keep track of what you've read.
          </h2>
        </div>
        <div className="flex flex-col items-center gap-4">
          <SignUp text="Get started" />
          or
          <AnonLogin />
        </div>
      </main>
      <Toast />
      <Footer />
    </div>
  );
}
