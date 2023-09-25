import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./store.js";
import { Provider } from "react-redux";
import "./index.css";
import Landing from "./features/landing/routes/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
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
