import React from "react";
import styled from "styled-components";

const Image = styled.Image`
  width: ${props => (props.big ? "100" : "40")};
  height: ${props => (props.big ? "100" : "40")};
  border-radius: ${props => (props.big ? "50" : "20")};
`;

const Avatar = ({ source, big = false }) => {
  return (
    <Image
      source={{ uri: source || require("../assets/noPhoto.jpg") }}
      big={big}
    />
  );
};

export default Avatar;
