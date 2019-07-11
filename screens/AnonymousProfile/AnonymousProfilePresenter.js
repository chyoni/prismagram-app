import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../../components/Loader";
import UserProfile from "../../components/UserProfile";
import { USER_FRAGMENT } from "../../sharedQueries";

const View = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const GET_PROFILE = gql`
  query seeUser($username: String!) {
    seeUser(username: $username) {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

const AnonymousProfilePresenter = ({ username }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery(GET_PROFILE, {
    variables: { username }
  });
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch({ variables: { username } });
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {loading ? (
        <View>
          <Loader />
        </View>
      ) : (
        <UserProfile
          id={data.seeUser.user.id}
          username={data.seeUser.user.username}
          avatar={data.seeUser.user.avatar}
          bio={data.seeUser.user.bio}
          isSelf={data.seeUser.user.isSelf}
          isFollowing={data.seeUser.user.isFollowing}
          posts={data.seeUser.posts}
          following={data.seeUser.user.following}
          followers={data.seeUser.user.followers}
        />
      )}
    </ScrollView>
  );
};

export default AnonymousProfilePresenter;
