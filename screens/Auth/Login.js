import React, { useState } from "react";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import styled from "styled-components";
import { Alert } from "react-native";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { REQUEST_SECRET } from "./AuthQueries";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default ({ navigation }) => {
  const emailInput = useInput("");
  const [loading, setLoading] = useState(false);
  const requestSecretMutation = useMutation(REQUEST_SECRET, {
    variables: {
      email: emailInput.value
    }
  });
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const handleLogin = async () => {
    const { value } = emailInput;
    if (value === "") {
      return Alert.alert("이메일을 입력해주세요 🙂");
    } else if (!value.includes("@") || !value.includes(".")) {
      return Alert.alert("이메일 주소를 확인해 주세요 😥");
    } else if (!emailRegex.test(value)) {
      return Alert.alert("이메일 주소를 확인해 주세요 😥");
    }
    try {
      setLoading(true);
      const {
        data: { requestSecret }
      } = await requestSecretMutation();
      if (requestSecret) {
        Alert.alert("시크릿 키를 보냈습니다 이메일을 확인해주세요 🙂");
        navigation.navigate("Confirm", { email: value });
        return;
      } else {
        Alert.alert("해당 이메일 사용자가 존재하지 않습니다 🙄");
        navigation.navigate("Signup");
      }
    } catch (e) {
      Alert.alert("일시적 오류입니다 😥");
    } finally {
      setLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {/* 키보드켜진 상태에서 focus가 따른곳에 잡히면 키보드를 사라지게해주는거 */}
      <View>
        <AuthInput
          {...emailInput}
          placeholder={"이메일"}
          keyboardType={"email-address"}
          returnKeyType={"send"}
          onSubmitEditing={handleLogin}
          autoCorrect={false}
        />
        <AuthButton
          onPress={handleLogin}
          text={"시크릿 키 요청"}
          loading={loading}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
