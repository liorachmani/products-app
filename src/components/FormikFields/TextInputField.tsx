import { useField } from "formik";
import { InputText } from "primereact/inputtext";
import FieldErrorMessage from "./ErrorMessageField";

type AddProductFormInputProps = {
  label: string;
  id?: string;
  placeholder?: string;
  type?: string;
  name: string;
};

function TextInputField(inputProps: AddProductFormInputProps) {
  const { label, ...props } = inputProps;

  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <InputText {...field} {...props} />
      {meta.touched && meta.error && (
        <FieldErrorMessage>{meta.error}</FieldErrorMessage>
      )}
    </>
  );
}
export default TextInputField;
