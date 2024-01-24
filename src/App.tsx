import { ToastContainer } from "react-toastify";
import "./App.css";
import { Header, SearchBar, ProductsTable } from "@src/components";

function App() {
  return (
    <>
      <Header title="Lior's Products App" route="/add" buttonText="Add" />

      <SearchBar />

      <ToastContainer />

      <ProductsTable />
    </>
  );
}

export default App;
