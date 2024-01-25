import { AddProductForm, MainHeader } from "@src/components";
import { ROUTES } from "@src/main";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
  return (
    <>
      <MainHeader
        title="Add new product"
        link={ROUTES.DEFAULT}
        linkText="Go back"
      />

      <ToastContainer />
      <AddProductForm />
    </>
  );
};

export { AddProduct };
