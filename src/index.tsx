import "atropos/css";
import VersionSupportProvider from "providers/VersionSupportProvider/VersionSupportProvider";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./libs/i18n";
import * as serviceWorker from "./serviceWorker";
import reportWebVitals from "./tests/reportWebVitals";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
serviceWorker.register();
root.render(
  <VersionSupportProvider>
    <App />
  </VersionSupportProvider>
);
reportWebVitals();
