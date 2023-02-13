import React from "react";
import {
  createMemoryRouter,
  RouterProvider,
} from "react-router-dom";
import { routes } from "./routes";

export default function Router({ initialPathname, strategy }) {
  const router = createMemoryRouter(routes, {
    initialEntries: [initialPathname || "/"],
  });

  return <RouterProvider router={router} />;
}
