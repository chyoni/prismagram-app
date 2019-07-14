import React, { useState } from "react";
import { Alert, ActivityIndicator } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";
import styles from "../styles";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo-hooks";

const Touchable = styled.TouchableOpacity``;
const Container = styled.View`
  width: ${props => (props.big ? `${constants.width / 2.3}` : "85px")};
  background-color: ${props =>
    props.isFollowing ? props.theme.whiteColor : props.theme.blueColor};
  padding: 6px;
  border-radius: 6px;
  border: ${props =>
    props.isFollowing ? `1px solid ${styles.lightGreyColor}` : 0};
`;
const Text = styled.Text`
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  color: ${props =>
    props.isFollowing ? props.theme.blackColor : props.theme.whiteColor};
`;
const FOLLOW = gql`
  mutation follow($id: String!) {
    follow(id: $id)
  }
`;
const UNFOLLOW = gql`
  mutation unfollow($id: String!) {
    unfollow(id: $id)
  }
`;

const FollowButton = ({ isFollowing, userId, big = true }) => {
  const [isFollowed, setIsFollowed] = useState(isFollowing);
  const [loading, setIsLoading] = useState(false);
  const followMutation = useMutation(FOLLOW, { variables: { id: userId } });
  const unfollowMutation = useMutation(UNFOLLOW, { variables: { id: userId } });
  const handleFollow = async () => {
    if (isFollowed) {
      setIsLoading(true);
      setIsFollowed(!isFollowed);
      try {
        await unfollowMutation();
      } catch (e) {
        Alert.alert("일시적 오류입니다 😰");
      }
    } else {
      setIsLoading(true);
      setIsFollowed(!isFollowed);
      try {
        await followMutation();
      } catch (e) {
        Alert.alert("일시적 오류입니다 😰");
      }
    }
    setIsLoading(false);
  };
  return (
    <Touchable onPress={handleFollow}>
      <Container isFollowing={isFollowed} big={big}>
        {loading ? (
          <ActivityIndicator
            size={"small"}
            color={isFollowed ? "black" : "white"}
          />
        ) : isFollowed ? (
          <Text isFollowing={isFollowed}>팔로잉</Text>
        ) : (
          <Text isFollowing={isFollowed}>팔로우</Text>
        )}
      </Container>
    </Touchable>
  );
};

FollowButton.propTypes = {
  isFollowing: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
  big: PropTypes.bool
};

export default FollowButton;
