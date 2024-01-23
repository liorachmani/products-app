import { ToastContainer } from "react-toastify";
import "./App.css";
import { Header, Table, SearchBar } from "@src/components";

function App() {
  return (
    <>
      <Header title="Lior's Products App" route="/add" buttonText="Add" />

      <SearchBar />

      <ToastContainer />

      <Table />
    </>
  );
}

export default App;
