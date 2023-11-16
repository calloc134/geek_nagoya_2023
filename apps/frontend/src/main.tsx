import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./route";
import { UrqlProvider } from "./lib/urql/UrqlProvider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UrqlProvider>
      <RouterProvider router={router} />
    </UrqlProvider>
  </React.StrictMode>
);
