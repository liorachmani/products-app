import React from "react";
import ReactDOM from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import App from "./App.tsx";
import "./index.css";

async function enableMocking() {
  if (import.meta.env.MODE !== "development") {
    return;
  }

  const { worker } = await import("./mocks");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

enableMocking().then(() =>
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <PrimeReactProvider value={{ pt: { button: {} } }}>
        <App />
      </PrimeReactProvider>
    </React.StrictMode>
  )
);
