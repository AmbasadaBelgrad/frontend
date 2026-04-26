import "@shared/config/i18n";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import "../shared/styles/variables.css";
import "../shared/styles/reset.css";
import "../shared/styles/commonStyles.css";
import "./styles/index.css";

async function enableMocking() {
  if (!import.meta.env.DEV || import.meta.env.VITE_USE_MSW !== "true") {
    return;
  }

  const { worker } = await import("../mocks/browser");

  await worker.start({
    serviceWorker: {
      url: "/mockServiceWorker.js",
    },
    onUnhandledRequest: "warn",
  });

  console.log("[MSW] started");
}

(async () => {
  const mswReady = await enableMocking();
  console.log("[MSW READY STATE]", mswReady);

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
})();

