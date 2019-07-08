import React from "react";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import styled from "styled-components";
import { Alert } from "react-native";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default () => {
  const emailInput = useInput("");
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const handleLogin = () => {
    const { value } = emailInput;
    if (value === "") {
      return Alert.alert("이메일을 입력해주세요 🙂");
    } else if (!value.includes("@") || !value.includes(".")) {
      return Alert.alert("이메일 주소를 확인해 주세요 😥");
    } else if (!emailRegex.test(value)) {
      return Alert.alert("이메일 주소를 확인해 주세요 😥");
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
          onEndEditing={handleLogin}
          autoCorrect={false}
        />
        <AuthButton onPress={handleLogin} text={"시크릿 키 요청"} />
      </View>
    </TouchableWithoutFeedback>
  );
};
