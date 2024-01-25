import { ReactNode } from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {
  children: ReactNode;
}

const Header = (props: Props) => {
  const { children, ...restH1Props } = props;

  return <h1 {...restH1Props}>{children}</h1>;
};

export { Header };
