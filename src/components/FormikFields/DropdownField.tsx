import { useField } from "formik";
import { Dropdown } from "primereact/dropdown";
import FieldErrorMessage from "./ErrorMessageField";

type AddProductFormDropdownProps = {
  label: string;
  id?: string;
  placeholder?: string;
  type?: string;
  options: unknown[];
  name: string;
};

function DropdownField(dropdownProps: AddProductFormDropdownProps) {
  const { label, ...props } = dropdownProps;

  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <Dropdown {...field} {...props} />
      {meta.touched && meta.error && (
        <FieldErrorMessage>{meta.error}</FieldErrorMessage>
      )}
    </>
  );
}

export default DropdownField;
