import React, { useState, useCallback } from "react";
import TextField from "@mui/material/TextField";
import { debounce } from "lodash";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const debounceSearch = useCallback(debounce(onSearch, 300), [onSearch]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    debounceSearch(event.target.value);
  };

  return (
    <TextField
      fullWidth
      label="Search Users"
      variant="outlined"
      value={input}
      onChange={handleChange}
      margin="normal"
    />
  );
};

export default SearchBar;
