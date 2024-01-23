import { Product } from "@src/models";
import { useAppDispatch } from "@src/redux";
import { editCategory, editFilterText } from "@src/redux/slices";
import { debounce } from "@src/utils";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useCallback, useState } from "react";
import styled from "styled-components";

const StyledSearchBarContainer = styled.div`
  display: inline-grid;
  grid-template-columns: auto auto;
  grid-column-gap: 2rem;
  align-items: center;
  width: 70%;
  margin: 1rem;
`;

function SearchBar() {
  const [selectedCategory, setSelectedCategory] = useState<keyof Product | "">(
    ""
  );
  const [filterText, setFilterText] = useState<string>("");

  const dispatch = useAppDispatch();

  // Debounce function to delay dispatching the action
  const debounceDispatch = useCallback(
    debounce((newFilterValue: string) => {
      dispatch(editFilterText(newFilterValue));
    }, 500),
    [dispatch]
  );
  return (
    <StyledSearchBarContainer>
      <InputText
        data-testid="search-input"
        value={filterText}
        placeholder={`Search in ${selectedCategory}`}
        onChange={(e) => {
          setFilterText(e.target.value);
          debounceDispatch(e.target.value);
        }}
      />
      <Dropdown
        data-testid="dropdown-category"
        value={selectedCategory}
        options={
          ["name", "brand", "image", "price", "id"] as Array<keyof Product>
        }
        onChange={(e) => {
          setSelectedCategory(e.value);
          dispatch(editCategory(e.value));
        }}
        placeholder="Select a category"
      />
    </StyledSearchBarContainer>
  );
}

export default SearchBar;
