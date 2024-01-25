import { ToastContainer } from "react-toastify";
import "./App.css";
import { MainHeader, ProductsSearchBar, ProductsTable } from "@src/components";
import { ROUTES } from "./main";

function App() {
  return (
    <>
      <MainHeader
        title="Lior's Products App"
        link={ROUTES.ADD}
        linkText="Add"
      />

      <ProductsSearchBar />

      <ToastContainer />

      <ProductsTable />
    </>
  );
}

export default App;
