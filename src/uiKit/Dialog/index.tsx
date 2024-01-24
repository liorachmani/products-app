import { DialogProps, Dialog as PrimeReactDialog } from "primereact/dialog";

interface Props extends DialogProps {}

const Dialog = (props: Props) => {
  return <PrimeReactDialog {...props} />;
};

export { Dialog };
