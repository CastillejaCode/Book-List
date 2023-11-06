import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/Error/ErrorPage.js";
import Books from "./features/books/routes/index.js";
import Landing from "./features/landing/routes/index.js";
import Account from "./features/user/routes/index.js";
import { store } from "./store.js";
import "./index.css";
import { checkAuth } from "./utils/checkAuth.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/home",
    loader: checkAuth,
    errorElement: <ErrorPage />,
    element: <Books />,
  },
  {
    path: "/account",
    loader: checkAuth,
    errorElement: <ErrorPage />,
    element: <Account />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
