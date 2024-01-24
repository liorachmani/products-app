import { Product } from "@src/models";
import { useAppDispatch } from "@src/redux";
import { editCategory, editFilterText } from "@src/redux/slices";
import { Dropdown, SearchBar } from "@src/uiKit";
import { ChangeEvent, useState } from "react";
import styled from "styled-components";

const StyledSearchBarContainer = styled.div`
  display: inline-grid;
  grid-template-columns: auto auto;
  grid-column-gap: 2rem;
  align-items: center;
  width: 70%;
  margin: 1rem;
`;

export interface ProductsSearch {
  filterText: string;
  category: keyof Product | "";
}

const ProductsSearchBar = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<ProductsSearch["category"]>("name");
  const [filterText, setFilterText] =
    useState<ProductsSearch["filterText"]>("");

  const dispatch = useAppDispatch();

  const handleSearchBarChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };

  const handleSearchBarDebouncedChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(editFilterText(event.target.value));
  };

  return (
    <StyledSearchBarContainer>
      <SearchBar
        data-testid="search-input"
        value={filterText}
        placeholder={`Search in ${selectedCategory}`}
        onChange={handleSearchBarChange}
        debounced={{
          onChangeDebounced: handleSearchBarDebouncedChange,
          onChangeWait: 500,
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
};

export { ProductsSearchBar };
