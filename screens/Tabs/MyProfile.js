import React from "react";
import { ScrollView } from "react-native";
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
  const { data, loading } = useQuery(ME);
  return (
    <ScrollView>
      {loading ? (
        <View>
          <Loader />
        </View>
      ) : (
        <UserProfile
          id={data.me.id}
          username={data.me.username}
          avatar={data.me.avatar}
          bio={data.me.bio}
          isSelf={data.me.isSelf}
          isFollowing={data.me.isFollowing}
          posts={data.me.posts}
          following={data.me.following}
          followers={data.me.followers}
        />
      )}
    </ScrollView>
  );
};
