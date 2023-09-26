import Footer from "src/components/Footer";
import Header from "src/components/Header";
import { Link } from "react-router-dom";

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
          <button className=" btn-primary btn bg-indigo-600">
            Get started
          </button>
          or
          <Link to="/home" className="btn-outline btn">
            Try it out
          </Link>
        </div>
        {/* <AnimatePresence>
          {error || (notif && <Error key="error" />)}
        </AnimatePresence> */}
      </main>
      <Footer />
    </div>
  );
}
