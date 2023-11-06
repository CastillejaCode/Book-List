import auth from "src/auth/config";

export const checkAuth = async () => {
  if (!auth.currentUser) {
    throw new Response("No Authentication", {
      status: 401,
    });
  }
};
