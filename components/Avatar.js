import React from "react";
import styled from "styled-components";

const Image = styled.Image`
  width: ${props =>
    props.big === "big" ? "100" : props.big === "mid" ? "60" : "40"};
  height: ${props =>
    props.big === "big" ? "100" : props.big === "mid" ? "60" : "40"};
  border-radius: ${props =>
    props.big === "big" ? "50" : props.big === "mid" ? "30" : "20"};
`;

const Avatar = ({ source, big = "small" }) => {
  return (
    <Image
      source={{ uri: source || require("../assets/noPhoto.jpg") }}
      big={big}
    />
  );
};

export default Avatar;
