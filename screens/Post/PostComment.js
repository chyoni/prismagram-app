import React, { useState } from "react";
import {
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Alert
} from "react-native";
import styled from "styled-components";
import { useQuery, useMutation } from "react-apollo-hooks";
import { FULL_POST, ME, ADD_COMMENT } from "./PostQueries";
import Avatar from "../../components/Avatar";
import constants from "../../constants";
import useInput from "../../hooks/useInput";

const CaptionHorizantal = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px;
  margin-bottom: 15px;
`;
const DivideLine = styled.View`
  border-bottom-width: 0.5px;
  border-bottom-color: ${props => props.theme.lightGreyColor};
`;
const Horizontal = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px;
`;
const Vertical = styled.View``;
const AvatarBox = styled.View`
  margin-right: 10px;
`;
const TextBox = styled.View`
  flex-direction: row;
`;
const Username = styled.Text`
  font-weight: 600;
  font-size: 14px;
  margin-right: 3px;
`;
const Text = styled.Text``;
const Time = styled.Text`
  color: ${props => props.theme.lightGreyColor};
  font-size: 13px;
  margin-top: 3px;
`;
const CommentView = styled.View`
  background-color: ${props => props.theme.instarGreyColor};
  border-top-color: ${props => props.theme.lightGreyColor};
  flex-direction: row;
  align-items: center;
  border-top-width: 0.5px;
  width: ${constants.width};
  height: ${constants.height / 10};
  padding: 15px;
`;
const CommentInput = styled.TextInput`
  background-color: ${props => props.theme.whiteColor};
  width: ${constants.width / 1.4};
  border-radius: 15px;
  border: 0.5px solid ${props => props.theme.lightGreyColor};
  padding: 10px;
`;
const AddButton = styled.Text`
  color: ${props => props.theme.blueColor};
  font-weight: 600;
  font-size: 15px;
  margin-left: 7px;
`;

export default ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const comment = useInput("");
  const {
    data: { seeFullPost },
    loading,
    refetch
  } = useQuery(FULL_POST, {
    variables: { id: navigation.getParam("postId") }
  });
  const { data: meData, loading: meLoading } = useQuery(ME);
  const addCommentMutation = useMutation(ADD_COMMENT, {
    variables: {
      text: comment.value,
      postId: navigation.getParam("postId")
    },
    refetchQueries: () => [
      { query: FULL_POST, variables: { id: navigation.getParam("postId") } }
    ]
  });
  const submitComment = async () => {
    if (comment.value === "") {
      Alert.alert("먼저 댓글을 작성해주세요 😅");
      return;
    }
    try {
      await addCommentMutation();
    } catch (e) {
      console.log(e);
    }
  };
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
  if (loading && meLoading) {
    return (
      <ScrollView>
        <Loader />
      </ScrollView>
    );
  } else if (!loading && !meLoading && seeFullPost && meData) {
    const [createdTime] = seeFullPost.createdAt.split("T");
    return (
      <>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <CaptionHorizantal>
            <AvatarBox>
              <Avatar big={"small"} source={seeFullPost.user.avatar} />
            </AvatarBox>
            <Vertical>
              <TextBox>
                <Username>{seeFullPost.user.username}</Username>
                <Text>{seeFullPost.caption}</Text>
              </TextBox>
              <Time>{createdTime}</Time>
            </Vertical>
          </CaptionHorizantal>
          <DivideLine />
          {seeFullPost &&
            seeFullPost.comments.map(comment => (
              <Horizontal key={comment.id}>
                <AvatarBox>
                  <Avatar big={"small"} source={comment.user.avatar} />
                </AvatarBox>
                <Vertical>
                  <TextBox>
                    <Username>{comment.user.username}</Username>
                    <Text>{comment.text}</Text>
                  </TextBox>
                  <Time>{comment.createdAt.split("T")[0]}</Time>
                </Vertical>
              </Horizontal>
            ))}
        </ScrollView>
        <CommentView>
          <AvatarBox>
            <Avatar source={meData.me.avatar} />
          </AvatarBox>
          <CommentInput
            placeholder={"댓글 달기..."}
            value={comment.value}
            onChangeText={comment.onChange}
            onSubmitEditing={null}
          />
          <TouchableOpacity
            disabled={comment.value === "" ? true : false}
            onPress={submitComment}
          >
            <AddButton style={{ opacity: comment.value === "" ? 0.3 : 1 }}>
              {"게시"}
            </AddButton>
          </TouchableOpacity>
        </CommentView>
      </>
    );
  }
};
