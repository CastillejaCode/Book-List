import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CheckAuth from "./components/Error/CheckAuth.js";
import ErrorPage from "./components/Error/ErrorPage.js";
import Books from "./features/books/routes/index.js";
import Landing from "./features/landing/routes/index.js";
import Account from "./features/user/routes/index.js";
import "./index.css";
import { store } from "./store.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/home",
    errorElement: <ErrorPage />,
    element: (
      <CheckAuth>
        <Books />
      </CheckAuth>
    ),
  },
  {
    path: "/account",
    errorElement: <ErrorPage />,
    element: (
      <CheckAuth>
        <Account />
      </CheckAuth>
    ),
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
