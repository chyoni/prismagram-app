import React from "react";
import { TouchableOpacity, ImageBackground } from "react-native";
import styled from "styled-components";
import { withNavigation } from "react-navigation";
import PropTypes from "prop-types";
import MultiPage from "react-native-vector-icons/MaterialCommunityIcons";
import constants from "../constants";
import styles from "../styles";

const Overlay = styled.View`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
`;
const SquarePhoto = ({ navigation, files = [], id }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("DetailPost", { id })}
      style={{ width: constants.width / 3 }}
    >
      <ImageBackground
        source={{ uri: files[0].url }}
        style={{ width: constants.width / 3, height: constants.height / 5 }}
      >
        {files.length > 1 && (
          <Overlay>
            <MultiPage
              style={{
                color: styles.whiteColor,
                marginTop: 7,
                marginRight: 7,
                alignSelf: "flex-end"
              }}
              size={18}
              name={"checkbox-multiple-blank"}
            />
          </Overlay>
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
};

SquarePhoto.propTypes = {
  files: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired
};

export default withNavigation(SquarePhoto);
