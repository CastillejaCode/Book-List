import { getAuth } from "firebase/auth";

export default function checkVerification(interval = 5, limit = 60) {
  const auth = getAuth();
  const id = setInterval(async () => {
    await auth.currentUser?.reload();
    if (auth?.currentUser?.emailVerified) {
      clearInterval(id);
      window.location.reload();
    }
  }, interval * 1000);
  setTimeout(() => {
    clearInterval(id);
  }, limit * 1000);
}
