import React, { useState } from "react";
import {
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from "react-native";
import axios from "axios";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import constants from "../../constants";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo-hooks";
import { FEED_QUERY } from "../Tabs/TabsQueries";
import { API_KEY } from "../../secret";

const Horizontal = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 20px;
  padding-bottom: 5px;
`;
const ImageBox = styled.View`
  margin-right: 15px;
`;
const Vertical = styled.View``;
const TextInput = styled.TextInput`
  background-color: ${props => props.theme.whiteColor};
  border-bottom-color: ${props => props.theme.lightGreyColor};
  border-bottom-width: 1px;
  padding: 10px;
  width: ${constants.width / 1.7};
  margin-top: 10px;
`;
const Button = styled.View`
  padding: 15px;
  border-radius: 6px;
  background-color: ${props => props.theme.blueColor};
`;
const Text = styled.Text`
  font-weight: 600;
  font-size: 14px;
  color: ${props => props.theme.whiteColor};
`;
const UPLOAD = gql`
  mutation upload($caption: String!, $files: [String!]!, $location: String) {
    upload(caption: $caption, files: $files, location: $location) {
      id
      caption
      location
    }
  }
`;

export default ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const photo = navigation.getParam("photo");
  const caption = useInput("");
  const location = useInput("");
  const uploadMutation = useMutation(UPLOAD, {
    refetchQueries: () => [{ query: FEED_QUERY }]
  });

  const handleShare = async () => {
    setLoading(true);
    const { value: captionValue } = caption;
    if (captionValue === "") {
      Alert.alert("제목은 필수사항 입니다 😯");
    }
    const formData = new FormData();
    const name = photo.filename;
    const [, type] = name.split(".");

    formData.append("file", {
      uri: photo.uri,
      type: type.toLowerCase(),
      name
    });
    formData.append("timestamp", ((Date.now() / 1000) | 0).toString());
    formData.append("api_key", API_KEY);
    formData.append("upload_preset", "bojlyeke");

    try {
      const {
        data: { secure_url }
      } = await axios.post(
        "https://api.cloudinary.com/v1_1/dctekasfv/image/upload",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data"
          }
        }
      );
      if (secure_url) {
        const {
          data: { upload }
        } = await uploadMutation({
          variables: {
            caption: caption.value,
            location: location.value,
            files: [secure_url]
          }
        });
        if (upload.id) {
          navigation.navigate("Home");
        }
      }
    } catch (e) {
      if (e === 400) {
        Alert.alert(e, "😥");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <>
        <Horizontal>
          <ImageBox>
            <Image
              source={{ uri: photo.uri }}
              style={{ width: 100, height: 100 }}
            />
          </ImageBox>
          <Vertical>
            <TextInput
              value={caption.value}
              onChangeText={caption.onChange}
              placeholder={"제목"}
            />
            <TextInput
              value={location.value}
              onChangeText={location.onChange}
              placeholder={"위치"}
            />
          </Vertical>
        </Horizontal>
        <Horizontal style={{ justifyContent: "flex-end" }}>
          <TouchableOpacity onPress={handleShare}>
            <Button>
              {loading ? (
                <ActivityIndicator color={"white"} />
              ) : (
                <Text>공유</Text>
              )}
            </Button>
          </TouchableOpacity>
        </Horizontal>
      </>
    </TouchableWithoutFeedback>
  );
};
