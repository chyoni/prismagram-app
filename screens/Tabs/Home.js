import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import Feed from "../../components/Feed";
import styled from "styled-components";
import Loader from "../../components/Loader";
import { useQuery } from "react-apollo-hooks";
import { FEED_QUERY } from "./TabsQueries";
import constants from "../../constants";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  height: ${constants.height / 2};
`;

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
        data.seeFeed.map(post => <Feed key={post.id} {...post} />)
      )}
    </ScrollView>
  );
};
