import React from "react";
import { Image } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";
import styles from "../styles";
import SquarePhoto from "./SquarePhoto";

const Container = styled.View``;
const Touchable = styled.TouchableOpacity``;
const HeaderColumn = styled.View`
  padding: 20px;
  width: ${constants.width};
  height: ${constants.height / 3};
`;
const HorizontalBox = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;
const VerticalBox = styled.View`
  margin: 0 20px;
`;
const ImageBox = styled.View`
  margin-right: 10px;
`;
const BoldText = styled.Text`
  font-weight: 600;
  text-align: center;
  font-size: 18px;
`;
const Text = styled.Text`
  font-size: 15px;
`;
const BioText = styled.Text`
  font-weight: 600;
  font-size: 14px;
  margin-top: 20px;
`;
const ButtonContainer = styled.View`
  width: ${constants.width};
  margin-top: 15px;
  flex-direction: row;
`;
const EditButton = styled.View`
  width: 100%;
  background-color: ${props => props.theme.whiteColor};
  border: 1px solid ${props => props.theme.lightGreyColor};
  border-radius: 6px;
  padding: 6px;
  margin-top: 15px;
`;
const FollowButton = styled.View`
  width: ${constants.width / 2.3};
  background-color: ${props => props.theme.blueColor};
  border-radius: 6px;
  padding: 6px;
  margin-right: 10px;
`;
const MessageButton = styled.View`
  width: ${constants.width / 2.3};
  background-color: ${props => props.theme.whiteColor};
  border: 1px solid ${props => props.theme.lightGreyColor};
  border-radius: 6px;
  padding: 6px;
`;
const PhotoColumn = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const UserProfile = ({
  id,
  username,
  avatar,
  bio,
  isSelf,
  isFollowing,
  posts,
  following,
  followers
}) => {
  return (
    <Container
      style={{
        backgroundColor: styles.instarGreyColor,
        width: constants.width,
        height: constants.height
      }}
    >
      <HeaderColumn>
        <HorizontalBox>
          <ImageBox>
            <Touchable>
              <Image
                source={{ uri: avatar }}
                style={{ width: 100, height: 100, borderRadius: 50 }}
              />
            </Touchable>
          </ImageBox>
          <VerticalBox>
            <Touchable>
              <BoldText>{posts.length}</BoldText>
              <Text>게시물</Text>
            </Touchable>
          </VerticalBox>
          <VerticalBox>
            <Touchable>
              <BoldText>{followers.length}</BoldText>
              <Text>팔로워</Text>
            </Touchable>
          </VerticalBox>
          <VerticalBox>
            <Touchable>
              <BoldText>{following.length}</BoldText>
              <Text>팔로잉</Text>
            </Touchable>
          </VerticalBox>
        </HorizontalBox>
        <HorizontalBox>
          <BioText>{bio}</BioText>
        </HorizontalBox>
        {isSelf ? (
          <Touchable>
            <EditButton>
              <Text style={{ textAlign: "center", fontWeight: "600" }}>
                프로필 수정
              </Text>
            </EditButton>
          </Touchable>
        ) : (
          <ButtonContainer>
            <Touchable>
              <FollowButton>
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontWeight: "600"
                  }}
                >
                  팔로우
                </Text>
              </FollowButton>
            </Touchable>
            <Touchable>
              <MessageButton>
                <Text
                  style={{
                    textAlign: "center",
                    color: "black",
                    fontWeight: "600"
                  }}
                >
                  메시지
                </Text>
              </MessageButton>
            </Touchable>
          </ButtonContainer>
        )}
      </HeaderColumn>
      <PhotoColumn>
        {posts.map(post => (
          <SquarePhoto key={post.id} {...post} />
        ))}
      </PhotoColumn>
    </Container>
  );
};

UserProfile.propTypes = {
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  bio: PropTypes.string,
  isSelf: PropTypes.bool.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  posts: PropTypes.array,
  following: PropTypes.array,
  followers: PropTypes.array
};

export default UserProfile;
