import React from "react";
import { createRoot } from "react-dom/client";
import BrowserRouter from "./routing/BrowserRouter";

const mountPoint = document.getElementById("remote2-standalone")
const root = createRoot(mountPoint);
root.render(<BrowserRouter basename="/client" />);
