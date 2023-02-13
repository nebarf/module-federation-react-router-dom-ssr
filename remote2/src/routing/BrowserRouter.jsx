import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { routes } from "./routes";

export default function BrowserRouter({ basename }) {
  const router = createBrowserRouter(routes, { basename });
  return <RouterProvider router={router} />;
}
