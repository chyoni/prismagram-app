import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { withNavigation } from "react-navigation";
import PropTypes from "prop-types";
import constants from "../constants";

const SquarePhoto = ({ navigation, files = [], id }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("DetailPost", { id })}
      style={{ width: constants.width / 3 }}
    >
      <Image
        source={{ uri: files[0].url }}
        style={{ width: constants.width / 3, height: constants.height / 5 }}
      />
    </TouchableOpacity>
  );
};

SquarePhoto.propTypes = {
  files: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired
};

export default withNavigation(SquarePhoto);
