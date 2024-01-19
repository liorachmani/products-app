import { ToastContainer } from "react-toastify";
import "./App.css";
import { Header, Table } from "@src/components";

function App() {
  return (
    <>
      <Header />

      <ToastContainer />

      <Table />
    </>
  );
}

export default App;
