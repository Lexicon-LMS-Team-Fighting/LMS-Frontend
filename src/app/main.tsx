import "../css/index.css";

import { createRoot } from "react-dom/client";
import { router } from ".";
import { AuthProvider } from "../features/auth/context/authProvider";
import { RouterProvider } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
