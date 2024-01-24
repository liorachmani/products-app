import { ButtonProps, Button as PrimeReactButton } from "primereact/button";

interface Props extends ButtonProps {}

const Button = (props: Props) => {
  return <PrimeReactButton {...props} />;
};

export { Button };
