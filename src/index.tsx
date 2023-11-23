import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./tests/reportWebVitals";
import * as serviceWorker from "./serviceWorker";
import "./libs/i18n";
import VersionSupportProvider from "providers/VersionSupportProvider/VersionSupportProvider";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
serviceWorker.register();
root.render(
    <VersionSupportProvider>
            <App/>
        </VersionSupportProvider>

);
reportWebVitals();
