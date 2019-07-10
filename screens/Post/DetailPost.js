import React, { useState } from "react";
import styled from "styled-components";
import { ScrollView, RefreshControl } from "react-native";
import { useQuery } from "react-apollo-hooks";
import { FULL_POST } from "./PostQueries";
import Loader from "../../components/Loader";
import Feed from "../../components/Feed";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery(FULL_POST, {
    variables: { id: navigation.getParam("id") }
  });
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch({ variables: { id: navigation.getParam("id") } });
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
        data && data.seeFullPost && <Feed {...data.seeFullPost} />
      )}
    </ScrollView>
  );
};
