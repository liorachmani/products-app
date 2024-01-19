import { ToastContainer } from "react-toastify";
import "./App.css";
import { Header, Table, SearchBar } from "@src/components";

function App() {
  return (
    <>
      <Header />

      <SearchBar />

      <ToastContainer />

      <Table />
    </>
  );
}

export default App;
