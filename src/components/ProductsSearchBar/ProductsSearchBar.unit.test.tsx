// import { fireEvent, render } from "@testing-library/react";
// import { Provider } from "react-redux";
// import { SearchBar } from ".";
// import { editCategory, editFilterText, searchSlice } from "@src/redux/slices";
// import { configureStore } from "@reduxjs/toolkit";

// Mock dependencies
// jest.mock("@src/redux/slices", () => ({
//   editCategory: jest.fn(),
//   editFilterText: jest.fn(),
// }));

// Create a real store for testing purposes
// const storeMock = configureStore({ reducer: searchSlice.reducer });

describe("SearchBar component", () => {
  test("renders SearchBar component", () => {
    // const { getByTestId } = render(
    //   <Provider store={storeMock}>
    //     <SearchBar />
    //   </Provider>
    // );
    // const searchInput = getByTestId("search-input");
    // const categoryDropdown = getByTestId("dropdown-category");
    // expect(searchInput).toBeTruthy();
    // expect(categoryDropdown).toBeTruthy();
  });

  test("dispatches actions on user interactions", () => {
    //   const { getByTestId } = render(
    //     <Provider store={storeMock}>
    //       <SearchBar />
    //     </Provider>
    //   );
    //   const searchInput = getByTestId("search-input");
    //   const categoryDropdown = getByTestId("dropdown-category");
    //   fireEvent.click(categoryDropdown);
    //   const optionTextToSelect = "brand";
    //   const dropdownOptions = document.querySelectorAll(".p-dropdown-item");
    //   const optionIndex = Array.from(dropdownOptions).findIndex(
    //     (option) => option.textContent === optionTextToSelect
    //   );
    //   fireEvent.change(searchInput, { target: { value: "test" } });
    //   fireEvent.click(dropdownOptions[optionIndex]);
    //   storeMock.dispatch = jest.fn();
    //   // expect(storeMock.dispatch).toHaveBeenCalledWith(editFilterText("test"));
    //   // expect(storeMock.dispatch).toHaveBeenCalledWith(editCategory(optionTextToSelect));
    //   expect(
    //     searchSlice.reducer(
    //       { category: "", filterText: "" },
    //       editFilterText("test")
    //     )
    //   ).toEqual({ category: "", filterText: "test" });
    //   expect(
    //     searchSlice.reducer(
    //       { category: "", filterText: "test" },
    //       editCategory(optionTextToSelect)
    //     )
    //   ).toEqual({ category: optionTextToSelect, filterText: "test" });
  });
});
