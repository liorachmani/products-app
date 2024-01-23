import styled from "styled-components";
import { DropdownField, Loading, TextInputField } from "@src/components";
import {
  MSWResponseBody,
  Product,
  currentAvailableBrands,
  currentAvailableImages,
  productSchema,
} from "@src/models";
import { useAddNewProductMutation } from "@src/redux/api";
import { Form, Formik, FormikHelpers } from "formik";
import { Button } from "primereact/button";
import { toast } from "react-toastify";
import { extractErrorMessage } from "@src/utils";

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 50vw;
  margin: auto;
  text-align: left;
`;

const FormFieldContainer = styled.div`
  margin: 1rem;
`;

const AddProductForm = () => {
  const [addProduct, { isLoading: isProductBeingAdded }] =
    useAddNewProductMutation();

  const onFormSubmit = async (
    values: Product,
    { setSubmitting }: FormikHelpers<Product>
  ) => {
    try {
      const payload: MSWResponseBody = await addProduct(values).unwrap();
      toast.success(payload.text);
    } catch (error) {
      const errMsg = extractErrorMessage(error);
      toast.error(errMsg);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      {isProductBeingAdded && <Loading />}
      {!isProductBeingAdded && (
        <Formik
          initialValues={{
            name: "",
            brand: "" as Product["brand"],
            image: "",
            price: 0,
            id: "",
          }}
          validationSchema={productSchema}
          onSubmit={onFormSubmit}
        >
          <StyledForm>
            <FormFieldContainer>
              <TextInputField
                label="Name: "
                name="name"
                placeholder="Product name"
              />
            </FormFieldContainer>

            <FormFieldContainer>
              <DropdownField
                label="Brand: "
                name="brand"
                placeholder="Product brand"
                options={currentAvailableBrands}
              />
            </FormFieldContainer>

            <FormFieldContainer>
              <DropdownField
                label="Image: "
                name="image"
                placeholder="Product image"
                options={currentAvailableImages}
              />
            </FormFieldContainer>

            <FormFieldContainer>
              <TextInputField
                label="Price: "
                name="price"
                type="number"
                placeholder="Product price"
              />
            </FormFieldContainer>
            <FormFieldContainer>
              <TextInputField label="ID: " name="id" placeholder="Product id" />
            </FormFieldContainer>
            <FormFieldContainer>
              <Button severity="success" type="submit" text raised>
                Submit
              </Button>
            </FormFieldContainer>
          </StyledForm>
        </Formik>
      )}
    </>
  );
};
export { AddProductForm };
