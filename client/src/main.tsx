import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./style/all.css";
import Index from "./routes/Index.tsx";
import { Provider } from "react-redux";
import store from "./redux/store/store.ts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Index />
      <ToastContainer />
    </Provider>
  </StrictMode>
);
