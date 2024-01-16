import React from "react";
import ReactDOM from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import App from "./App.tsx";
import { store } from "@src/redux";
import "./index.css";
import { Provider } from "react-redux";
import "primereact/resources/themes/lara-light-teal/theme.css";
import { ModalProvider } from "@src/providers";

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
      <Provider store={store}>
        <PrimeReactProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </PrimeReactProvider>
      </Provider>
    </React.StrictMode>
  )
);
