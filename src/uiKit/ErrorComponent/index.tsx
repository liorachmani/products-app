interface Props {
  errorMessage: string;
}

const ErrorComponent = (props: Props) => {
  const { errorMessage } = props;

  return (
    <div style={{ textAlign: "center", color: "red" }}>{errorMessage}</div>
  );
};

export { ErrorComponent };
