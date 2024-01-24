import {
  InputText as PrimeReactInputText,
  InputTextProps,
} from "primereact/inputtext";

interface Props extends InputTextProps {}

const InputText = (props: Props) => {
  return <PrimeReactInputText {...props} />;
};

export { InputText };
