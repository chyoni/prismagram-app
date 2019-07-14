import React, { useState } from "react";
import {
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl
} from "react-native";
import { withNavigation } from "react-navigation";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { SEE_NOTIFICATION } from "../TabsQueries";
import Loader from "../../../components/Loader";
import Avatar from "../../../components/Avatar";
import constants from "../../../constants";
import FollowButton from "../../../components/FollowButton";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const Container = styled.View`
  flex: 1;
  padding: 14px;
`;
const Horizontal = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 18px;
`;
const AvatarBox = styled.TouchableOpacity`
  margin-right: 10px;
`;
const Info = styled.View`
  width: ${constants.width / 1.5 + 10};
`;
const Username = styled.Text`
  font-weight: 600;
  font-size: 14px;
`;
const Text = styled.Text``;
const ThePost = styled.View``;

export default withNavigation(({ navigation, username }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery(SEE_NOTIFICATION, {
    variables: { username }
  });
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch({ variables: { username } });
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };
  if (loading) {
    return (
      <View>
        <Loader />
      </View>
    );
  } else if (!loading && data && data.seeNotification) {
    return (
      <ScrollView
        style={{ flex: 1, padding: 14 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {data.seeNotification.map(note => (
          <Horizontal key={note.id}>
            <AvatarBox
              onPress={() =>
                navigation.navigate("AnonymousProfile", {
                  username: note.from.username
                })
              }
            >
              <Avatar big={"small"} source={note.from.avatar} />
            </AvatarBox>
            {note.type === "LIKE" && (
              <>
                <Info>
                  <Text>
                    <Username>{note.from.username}</Username>님이 좋아합니다 😝
                  </Text>
                </Info>
                <ThePost>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("DetailPost", { id: note.post.id })
                    }
                  >
                    <Image
                      source={{ uri: note.post.files[0].url }}
                      style={{ width: 40, height: 40 }}
                    />
                  </TouchableOpacity>
                </ThePost>
              </>
            )}
            {note.type === "COMMENT" && (
              <>
                <Info>
                  <Text>
                    <Username>{note.from.username}</Username>님이 댓글을
                    남겼습니다 😊
                  </Text>
                </Info>
                <ThePost>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("DetailPost", { id: note.post.id })
                    }
                  >
                    <Image
                      source={{ uri: note.post.files[0].url }}
                      style={{ width: 40, height: 40 }}
                    />
                  </TouchableOpacity>
                </ThePost>
              </>
            )}
            {note.type === "FOLLOW" && (
              <>
                <Info style={{ width: constants.width / 2, marginRight: 30 }}>
                  <Text>
                    <Username>{note.from.username}</Username>님이 당신을 팔로우
                    합니다 😍
                  </Text>
                </Info>
                <ThePost>
                  <FollowButton
                    big={false}
                    userId={note.from.id}
                    isFollowing={note.from.isFollowing}
                  />
                </ThePost>
              </>
            )}
          </Horizontal>
        ))}
      </ScrollView>
    );
  }
});
