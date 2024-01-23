import { useField } from "formik";
import { Dropdown } from "primereact/dropdown";
import { FieldErrorMessage } from "./ErrorMessageField";

interface Props {
  label: string;
  id?: string;
  placeholder?: string;
  type?: string;
  options: unknown[];
  name: string;
}

const DropdownField = (props: Props) => {
  const { label, ...dropdownProps } = props;

  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(dropdownProps);
  return (
    <>
      <label htmlFor={dropdownProps.id || dropdownProps.name}>{label}</label>
      <Dropdown {...field} {...dropdownProps} />
      {meta.touched && meta.error && (
        <FieldErrorMessage>{meta.error}</FieldErrorMessage>
      )}
    </>
  );
};

export { DropdownField };
