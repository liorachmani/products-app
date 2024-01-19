import { AddProductForm } from "@src/components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

const AddNewProductHeader = styled.h1`
  line-height: 0;
`;

function AddProduct() {
  return (
    <>
      <AddNewProductHeader>Add new product:</AddNewProductHeader>
      <ToastContainer />
      <AddProductForm />
    </>
  );
}

export default AddProduct;
