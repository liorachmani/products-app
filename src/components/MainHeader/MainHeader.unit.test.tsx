import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Use MemoryRouter to wrap the component with a Router
import { MainHeader } from "./MainHeader";

test("renders Header component", () => {
  const { getByText } = render(
    <MemoryRouter>
      <MainHeader title="Lior's Products App" link="add" linkText="Add" />
    </MemoryRouter>
  );

  const headerText = getByText("Lior's Products App");
  const addProductButton = getByText("Add");

  expect(headerText.textContent).toBe("Lior's Products App");
  expect(addProductButton).toBeTruthy();
});
