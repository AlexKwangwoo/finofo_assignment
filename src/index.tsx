import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // Tanstack (to cache or manage the fatched data)
  <QueryClientProvider client={client}>
    <RouterProvider router={router} />{" "}
  </QueryClientProvider>
);
