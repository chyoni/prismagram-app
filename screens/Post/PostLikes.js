import React, { useState } from "react";
import { ScrollView, RefreshControl, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { FULL_POST } from "./PostQueries";
import Loader from "../../components/Loader";
import constants from "../../constants";
import Avatar from "../../components/Avatar";
import FollowButton from "../../components/FollowButton";

const LoaderView = styled.View`
  flex: 1;
  align-items: center;
`;
const Horizontal = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px;
  width: ${constants.width};
`;
const AvatarBox = styled.View`
  margin-right: 10px;
`;
const Vertical = styled.View`
  width: ${constants.width / 1.9};
`;
const Username = styled.Text`
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 3px;
`;
const Bio = styled.Text`
  font-size: 14px;
  color: ${props => props.theme.lightGreyColor};
`;
const Text = styled.Text`
  font-size: 16px;
  font-weight: 600;
`;

export default ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const {
    data: { seeFullPost },
    loading,
    refetch
  } = useQuery(FULL_POST, {
    variables: {
      id: navigation.getParam("postId")
    }
  });
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch({ variables: { id: navigation.getParam("postId") } });
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };
  if (loading) {
    return (
      <LoaderView>
        <Loader />
      </LoaderView>
    );
  } else if (!loading && seeFullPost) {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {seeFullPost.likes.length > 0 ? (
          seeFullPost.likes.map(like => (
            <Horizontal key={like.id}>
              <AvatarBox>
                <Avatar big={"mid"} source={like.user.avatar} />
              </AvatarBox>
              <Vertical>
                <Username>{like.user.username}</Username>
                <Bio>{like.user.bio}</Bio>
              </Vertical>
              {!like.user.isSelf && (
                <TouchableOpacity>
                  <FollowButton
                    isFollowing={like.user.isFollowing}
                    userId={like.user.id}
                    big={false}
                  />
                </TouchableOpacity>
              )}
            </Horizontal>
          ))
        ) : (
          <LoaderView>
            <Text>해당 게시물에 좋아요가 없습니다 😥</Text>
          </LoaderView>
        )}
      </ScrollView>
    );
  }
};
