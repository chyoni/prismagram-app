import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import Feed from "../../components/Feed";
import styled from "styled-components";
import Loader from "../../components/Loader";
import { useQuery } from "react-apollo-hooks";
import { FEED_QUERY } from "./TabsQueries";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery(FEED_QUERY);
  const refresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
    >
      {loading ? (
        <View>
          <Loader />
        </View>
      ) : (
        data &&
        data.seeFeed &&
        data.seeFeed.map(post => (
          <Feed
            goToPostComment={() =>
              navigation.navigate("PostComment", { postId: post.id })
            }
            key={post.id}
            {...post}
          />
        ))
      )}
    </ScrollView>
  );
};
