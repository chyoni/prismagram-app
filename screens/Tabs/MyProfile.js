import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import styled from "styled-components";
import Loader from "../../components/Loader";
import { useQuery } from "react-apollo-hooks";
import { ME } from "./TabsQueries";
import UserProfile from "../../components/UserProfile";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery(ME);
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };
  if (loading) {
    return (
      <ScrollView>
        <View>
          <Loader />
        </View>
      </ScrollView>
    );
  } else {
    const descPosts = data.me.posts.reverse();
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <UserProfile
          id={data.me.id}
          username={data.me.username}
          avatar={data.me.avatar}
          bio={data.me.bio}
          isSelf={data.me.isSelf}
          isFollowing={data.me.isFollowing}
          posts={descPosts}
          following={data.me.following}
          followers={data.me.followers}
        />
      </ScrollView>
    );
  }
};
