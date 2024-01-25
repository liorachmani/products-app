import { Header } from "@src/uiKit";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledHeader = styled(Header)`
  text-align: center;
  margin: auto;
  font-weight: 600;
  background-image: linear-gradient(to left, #030712, #e14040);
  color: transparent;
  background-clip: text;
`;

const StyledHeaderButton = styled.button`
  text-align: center;
  margin: auto;
  background-color: #d76767;
  color: black;
`;

const StyledHeaderContainer = styled.div`
  display: inline-grid;
  grid-template-columns: auto auto;
  grid-column-gap: 2rem;
  align-items: center;
`;

interface Props {
  title: string;
  link?: string;
  linkText?: string;
}

const MainHeader = (props: Props) => {
  const { title, link, linkText = "link" } = props;
  return (
    <StyledHeaderContainer>
      <StyledHeader>{title}</StyledHeader>
      {link && (
        <Link to={link}>
          <StyledHeaderButton>{linkText}</StyledHeaderButton>
        </Link>
      )}
    </StyledHeaderContainer>
  );
};

export { MainHeader };
