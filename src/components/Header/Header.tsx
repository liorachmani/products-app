import styled from "styled-components";

const StyledHeader = styled.h1`
  text-align: center;
  margin: auto;
  font-weight: 600;
  background-image: linear-gradient(to left, #030712, #e14040);
  color: transparent;
  background-clip: text;
`;

function Header() {
  return <StyledHeader>Lior's Products App</StyledHeader>;
}

export default Header;
