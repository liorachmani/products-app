import {
  DropdownProps,
  Dropdown as PrimeReactDropdown,
} from "primereact/dropdown";

interface Props extends DropdownProps {}

const Dropdown = (props: Props) => {
  return <PrimeReactDropdown {...props} />;
};

export { Dropdown };
