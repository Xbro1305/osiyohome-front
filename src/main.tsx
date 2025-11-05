import { createRoot } from "react-dom/client";
import "./index.css";
import { Router } from "./Router.tsx";
import "./i18n.js";

createRoot(document.getElementById("root")!).render(<Router />);
