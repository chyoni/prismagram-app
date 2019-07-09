import React from "react";
import { TextInput } from "react-native";
import PropTypes from "prop-types";

const SearchBar = ({ onChange, value, onSubmit }) => {
  return (
    <TextInput
      value={value}
      onChange={onChange}
      onSubmit={onSubmit}
      placeholder={"Search"}
    />
  );
};

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default SearchBar;
