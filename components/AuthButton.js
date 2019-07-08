import React from "react";
import styled from "styled-components";
import { ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import constants from "../constants";

const Touchable = styled.TouchableOpacity``;
const Container = styled.View`
  background-color: ${props =>
    props.loading
      ? "rgba(0,0,0,0.1)"
      : props.state === "confirm"
      ? props.theme.redColor
      : props.bgColor
      ? props.bgColor
      : props.theme.blueColor};
  padding: 10px;
  width: ${constants.width / 2};
  border-radius: 5px;
  margin-bottom: 20px;
`;

const Text = styled.Text`
  color: white;
  text-align: center;
  font-weight: 600;
`;
const AuthButton = ({
  text,
  onPress,
  loading = false,
  state = "",
  bgColor = null
}) => {
  return (
    <Touchable disabled={loading} onPress={onPress}>
      <Container loading={loading} state={state} bgColor={bgColor}>
        {loading ? (
          <ActivityIndicator size={"small"} color={"white"} />
        ) : (
          <Text>{text}</Text>
        )}
      </Container>
    </Touchable>
  );
};

AuthButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  state: PropTypes.string
};

export default AuthButton;
