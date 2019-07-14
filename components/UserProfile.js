import React, { useState } from "react";
import styled from "styled-components";
import DashBoard from "react-native-vector-icons/MaterialCommunityIcons";
import Tag from "react-native-vector-icons/SimpleLineIcons";
import PropTypes from "prop-types";
import constants from "../constants";
import styles from "../styles";
import SquarePhoto from "./SquarePhoto";
import Avatar from "./Avatar";
import FollowButton from "./FollowButton";

const Container = styled.View`
  width: ${constants.width};
`;
const Touchable = styled.TouchableOpacity``;
const HeaderColumn = styled.View`
  padding: 20px;
  padding-bottom: 15px;
  max-width: ${constants.width};
  border-bottom-color: ${styles.superLightGreyColor};
  border-bottom-width: 1px;
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
  margin-top: 15px;
  flex-direction: row;
`;
const Button = styled.View`
  width: ${constants.width / 2.3};
  align-items: center;
`;
const EditButton = styled.View`
  width: 100%;
  background-color: ${props => props.theme.whiteColor};
  border: 1px solid ${props => props.theme.lightGreyColor};
  border-radius: 6px;
  padding: 6px;
  margin-top: 15px;
`;

const MessageButton = styled.View`
  width: ${constants.width / 2.3};
  background-color: ${props => props.theme.whiteColor};
  border: 1px solid ${props => props.theme.lightGreyColor};
  border-radius: 6px;
  margin-left: 10px;
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
  const [isGrid, setIsGrid] = useState(true);
  const toggleGrid = () => {
    if (isGrid) {
      setIsGrid(false);
    } else {
      setIsGrid(true);
    }
  };
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
              <Avatar source={avatar} big={"big"} />
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
            <FollowButton isFollowing={isFollowing} userId={id} />
            {/*  <Touchable>
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
            </Touchable> */}

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
        <ButtonContainer>
          <Touchable onPress={toggleGrid}>
            <Button style={{ marginRight: 10 }}>
              <DashBoard
                name={"view-grid"}
                size={27}
                color={isGrid ? styles.blackColor : styles.lightGreyColor}
              />
            </Button>
          </Touchable>
          <Touchable onPress={toggleGrid}>
            <Button>
              <Tag
                name={"tag"}
                size={27}
                color={isGrid ? styles.lightGreyColor : styles.blackColor}
              />
            </Button>
          </Touchable>
        </ButtonContainer>
      </HeaderColumn>
      {isGrid ? (
        <PhotoColumn>
          {posts.map(post => (
            <SquarePhoto key={post.id} {...post} />
          ))}
        </PhotoColumn>
      ) : null}
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
