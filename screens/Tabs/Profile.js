import React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components";
import Loader from "../../components/Loader";
import { useQuery } from "react-apollo-hooks";
import { ME } from "./TabsQueries";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation }) => {
  const { data, loading } = useQuery(ME);
  console.log(data, loading);
  return (
    <ScrollView>
      {loading ? (
        <View>
          <Loader />
        </View>
      ) : null}
    </ScrollView>
  );
};
