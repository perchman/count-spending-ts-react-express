import React from "react";
import ReactDOM, {Root} from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

const rootElement: HTMLElement | null = document.getElementById("root");

if (!rootElement) {
    throw new Error("HTML element 'root' is null");
}

const root: Root = ReactDOM.createRoot(rootElement);
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);