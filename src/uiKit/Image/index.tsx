import { ImageProps, Image as PrimeReactImage } from "primereact/image";

interface Props extends ImageProps {}

const Image = (props: Props) => {
  return <PrimeReactImage {...props} />;
};

export { Image };
