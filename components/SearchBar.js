import React from "react";
import { TextInput } from "react-native";
import PropTypes from "prop-types";
import styles from "../styles";
import constants from "../constants";

const SearchBar = ({ onChange, value, onSubmit }) => {
  return (
    <TextInput
      style={{
        width: constants.width - 40,
        height: 35,
        backgroundColor: "#ecf0f1",
        borderRadius: 15,
        padding: 5,
        fontSize: 13
      }}
      value={value}
      onChangeText={onChange}
      returnKeyType={"search"}
      onSubmitEditing={onSubmit}
      placeholder={`🔍 Search`}
      placeholderTextColor={styles.darkGreyColor}
    />
  );
};

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default SearchBar;
