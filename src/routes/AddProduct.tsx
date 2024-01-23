import { AddProductForm, Header } from "@src/components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddProduct() {
  return (
    <>
      <Header title="Add new product" route="/" buttonText="Go back" />

      <ToastContainer />
      <AddProductForm />
    </>
  );
}

export default AddProduct;
