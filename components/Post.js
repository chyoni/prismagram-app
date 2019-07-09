import React from "react";
import { Image } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.View``;
const Header = styled.View`
  padding: 15px;
  flex-direction: row;
  align-items: center;
`;
const Touchable = styled.TouchableOpacity``;
const HeaderUserColumn = styled.View`
  margin-left: 10px;
`;
const Username = styled.Text`
  font-weight: 600;
`;

const Location = styled.Text`
  font-size: 12px;
`;

const Post = post => {
  return (
    <Container>
      <Header>
        <Touchable>
          <Image
            style={{ width: 40, height: 40, borderRadius: 20 }}
            source={{ uri: post.user.avatar }}
          />
        </Touchable>
        <Touchable>
          <HeaderUserColumn>
            <Username>{post.user.username}</Username>
            <Location>{post.location}</Location>
          </HeaderUserColumn>
        </Touchable>
      </Header>
    </Container>
  );
};

Post.propTypes = {
  id: PropTypes.string.isRequired,
  caption: PropTypes.string,
  location: PropTypes.string,
  likes: PropTypes.array,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired
      })
    })
  ).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  isLiked: PropTypes.bool.isRequired,
  likeCount: PropTypes.number.isRequired,
  createdTime: PropTypes.string,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired
  }).isRequired
};

export default Post;
