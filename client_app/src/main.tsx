import ReactDOM from "react-dom/client";
import "./index.css";
import "semantic-ui-css/semantic.min.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StoreContext.Provider value={store}>
    <RouterProvider router={router} />
  </StoreContext.Provider>
);
