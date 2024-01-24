import { InputTextProps } from "primereact/inputtext";
import { InputText } from "@src/uiKit";
import { ChangeEvent, ChangeEventHandler, useCallback } from "react";
import { debounce } from "lodash";

interface Props extends InputTextProps {
  debounced?: {
    onChangeDebounced: ChangeEventHandler<HTMLInputElement>;
    onChangeWait?: number;
  };
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const SearchBar = (props: Props) => {
  const { onChange, debounced, ...rest } = props;
  const { onChangeDebounced, onChangeWait } = debounced || {};

  // Debounce function to delay dispatching the action for each character typed
  const handleOnDebouncedChange = useCallback(
    debounce((event: ChangeEvent<HTMLInputElement>) => {
      onChangeDebounced && onChangeDebounced(event);
    }, onChangeWait || 0),
    [onChangeDebounced, onChangeWait]
  );

  // Determine which event handlers to use based on whether debouncing is enabled
  const handleChange = debounced
    ? (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event);
        handleOnDebouncedChange(event);
      }
    : onChange;

  return <InputText onChange={handleChange} {...rest} />;
};

export { SearchBar };
