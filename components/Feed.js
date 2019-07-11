import React, { useState } from "react";
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
import { withNavigation } from "react-navigation";
import { useMutation } from "react-apollo-hooks";
import { TOGGLE_LIKE } from "../sharedQueries";
import Avatar from "./Avatar";

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

const Feed = withNavigation(
  ({
    navigation,
    user,
    createdAt,
    isLiked,
    likeCount,
    id,
    location,
    files,
    caption,
    comments
  }) => {
    const [createdTime] = createdAt.split("T");
    const [isLikedState, setIsLikedState] = useState(isLiked);
    const [likeCountState, setLikeCountState] = useState(likeCount);
    const toggleLikeMutation = useMutation(TOGGLE_LIKE, {
      variables: {
        postId: id
      }
    });
    const toggleLike = () => {
      if (isLikedState) {
        setIsLikedState(false);
        setLikeCountState(likeCountState - 1);
      } else {
        setIsLikedState(true);
        setLikeCountState(likeCountState + 1);
      }
      try {
        toggleLikeMutation();
      } catch (e) {
        setIsLikedState(!isLikedState);
        console.log(e);
      }
    };

    return (
      <Container>
        <Header>
          <Touchable
            onPress={() =>
              navigation.navigate("AnonymousProfile", {
                username: user.username
              })
            }
          >
            <Avatar source={user.avatar} big={false} />
          </Touchable>
          <HeaderUserColumn>
            <Touchable
              onPress={() =>
                navigation.navigate("AnonymousProfile", {
                  username: user.username
                })
              }
            >
              <Bold>{user.username}</Bold>
            </Touchable>
            <Location>{location}</Location>
          </HeaderUserColumn>
        </Header>
        <Swiper
          style={{ height: constants.height / 1.5 }}
          dotStyle={{ backgroundColor: styles.darkWhiteColor }}
          loop={false}
        >
          {files.map(file => (
            <Image
              key={file.id}
              style={{ width: constants.width, height: constants.height / 1.5 }}
              source={{ uri: file.url }}
            />
          ))}
        </Swiper>
        <IconsContainer>
          <Touchable onPress={toggleLike}>
            <IconItem>
              <Ionicons
                color={isLikedState ? styles.redColor : styles.blackColor}
                name={isLikedState ? "ios-heart" : "ios-heart-empty"}
                size={30}
              />
            </IconItem>
          </Touchable>
          <Touchable
            onPress={() => navigation.navigate("PostComment", { postId: id })}
          >
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
            <Bold>좋아요 {likeCountState}개</Bold>
          </Touchable>
          <InfoUserCaptionColumn>
            <Touchable>
              <Bold>{user.username}</Bold>
            </Touchable>
            <Caption>{caption}</Caption>
          </InfoUserCaptionColumn>
        </InfoContainer>
        <CommentsColumn>
          {comments.length > 1 ? (
            <Touchable
              onPress={() => navigation.navigate("PostComment", { postId: id })}
            >
              <Text>{`댓글 ${comments.length}개 모두보기`}</Text>
            </Touchable>
          ) : null}
        </CommentsColumn>
        <CreatedTime>{createdTime}</CreatedTime>
      </Container>
    );
  }
);

Feed.propTypes = {
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

export default Feed;
