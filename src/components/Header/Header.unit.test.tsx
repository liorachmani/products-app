import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Use MemoryRouter to wrap the component with a Router

import Header from "./Header";

test("renders Header component", () => {
  const { getByText } = render(
    <MemoryRouter>
      <Header title="Lior's Products App" route="add" buttonText="Add" />
    </MemoryRouter>
  );

  const headerText = getByText("Lior's Products App");
  const addProductButton = getByText("Add");

  expect(headerText.textContent).toBe("Lior's Products App");
  expect(addProductButton).toBeTruthy();
});
