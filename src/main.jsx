import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import { RootNavigation } from "./navigation/rootNavigation";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RootNavigation />
  </React.StrictMode>
);