import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledHeader = styled.h1`
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
  route?: string;
  buttonText?: string;
}

const Header = (props: Props) => {
  const { title, route, buttonText = "button" } = props;
  return (
    <StyledHeaderContainer>
      <StyledHeader>{title}</StyledHeader>
      {route && (
        <Link to={route}>
          <StyledHeaderButton>{buttonText}</StyledHeaderButton>
        </Link>
      )}
    </StyledHeaderContainer>
  );
};

export { Header };
