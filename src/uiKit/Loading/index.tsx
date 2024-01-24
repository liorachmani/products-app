import {
  ProgressSpinner,
  ProgressSpinnerProps,
} from "primereact/progressspinner";

interface Props extends ProgressSpinnerProps {}

const Loading = (props: Props) => {
  return <ProgressSpinner {...props} />;
};

export { Loading };
