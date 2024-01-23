import { useField } from "formik";
import { InputText } from "primereact/inputtext";
import { FieldErrorMessage } from "./ErrorMessageField";

interface Props {
  label: string;
  id?: string;
  placeholder?: string;
  type?: string;
  name: string;
}

const TextInputField = (props: Props) => {
  const { label, ...inputProps } = props;

  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(inputProps);
  return (
    <>
      <label htmlFor={inputProps.id || inputProps.name}>{label}</label>
      <InputText {...field} {...inputProps} />
      {meta.touched && meta.error && (
        <FieldErrorMessage>{meta.error}</FieldErrorMessage>
      )}
    </>
  );
};
export { TextInputField };
