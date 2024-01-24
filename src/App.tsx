import { ToastContainer } from "react-toastify";
import "./App.css";
import { Header, ProductsSearchBar, ProductsTable } from "@src/components";

function App() {
  return (
    <>
      <Header title="Lior's Products App" route="/add" buttonText="Add" />

      <ProductsSearchBar />

      <ToastContainer />

      <ProductsTable />
    </>
  );
}

export default App;
