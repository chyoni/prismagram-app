import React from "react";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import LineIcons from "react-native-vector-icons/SimpleLineIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import styled from "styled-components";
import PropTypes from "prop-types";
import Swiper from "react-native-swiper";
import constants from "../constants";
import styles from "../styles";

const Container = styled.View``;
const Header = styled.View`
  padding: 10px 15px;
  flex-direction: row;
  align-items: center;
`;
const Touchable = styled.TouchableOpacity``;
const HeaderUserColumn = styled.View`
  margin-left: 10px;
`;
const Bold = styled.Text`
  font-weight: 600;
`;
const Location = styled.Text`
  font-size: 12px;
`;
const InfoUserCaptionColumn = styled.View`
  flex-direction: row;
  margin-top: 5px;
`;
const Caption = styled.Text`
  margin-left: 5px;
`;
const IconsContainer = styled.View`
  padding: 13px;
  padding-bottom: 7px;
  flex-direction: row;
  align-items: center;
`;
const IconItem = styled.View`
  margin-right: 7px;
`;
const InfoContainer = styled.View`
  padding-left: 13px;
`;
const CommentsColumn = styled.View`
  margin-top: 5px;
  padding-left: 13px;
  margin-bottom: 10px;
`;
const Text = styled.Text`
  color: ${props => props.theme.lightGreyColor};
`;
const CreatedTime = styled.Text`
  color: ${props => props.theme.lightGreyColor};
  padding-left: 13px;
  font-size: 11px;
`;

const Post = post => {
  const [createdTime] = post.createdAt.split("T");
  return (
    <Container>
      <Header>
        <Touchable>
          <Image
            style={{ width: 40, height: 40, borderRadius: 20 }}
            source={{ uri: post.user.avatar }}
          />
        </Touchable>
        <HeaderUserColumn>
          <Touchable>
            <Bold>{post.user.username}</Bold>
          </Touchable>
          <Location>{post.location}</Location>
        </HeaderUserColumn>
      </Header>
      <Swiper
        style={{ height: constants.height / 1.5 }}
        dotStyle={{ backgroundColor: styles.darkWhiteColor }}
        loop={false}
      >
        {post.files.map(file => (
          <Image
            key={file.id}
            style={{ width: constants.width, height: constants.height / 1.5 }}
            source={{ uri: file.url }}
          />
        ))}
      </Swiper>
      <IconsContainer>
        <Touchable>
          <IconItem>
            <Ionicons name={"ios-heart-empty"} size={30} />
          </IconItem>
        </Touchable>
        <Touchable>
          <IconItem>
            <EvilIcons name={"comment"} size={40} />
          </IconItem>
        </Touchable>
        <Touchable>
          <IconItem>
            <LineIcons name={"paper-plane"} size={28} />
          </IconItem>
        </Touchable>
        <Touchable style={{ marginLeft: 210 }}>
          <IconItem>
            <FontAwesomeIcon name={"bookmark-o"} size={30} />
          </IconItem>
        </Touchable>
      </IconsContainer>
      <InfoContainer>
        <Touchable>
          <Bold>좋아요 {post.likeCount}개</Bold>
        </Touchable>
        <InfoUserCaptionColumn>
          <Touchable>
            <Bold>{post.user.username}</Bold>
          </Touchable>
          <Caption>{post.caption}</Caption>
        </InfoUserCaptionColumn>
      </InfoContainer>
      <CommentsColumn>
        {post.comments.length > 1 ? (
          <Touchable>
            <Text>{`댓글 ${post.comments.length}개 모두보기`}</Text>
          </Touchable>
        ) : null}
      </CommentsColumn>
      <CreatedTime>{createdTime}</CreatedTime>
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
