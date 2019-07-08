import React, { useState } from "react";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import styled from "styled-components";
import { Alert } from "react-native";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { CONFIRM_SECRET } from "./AuthQueries";
import { useLogIn } from "../../AuthContext";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default ({ navigation }) => {
  const confirmInput = useInput("");
  const login = useLogIn();
  const [loading, setLoading] = useState(false);
  const confirmSecretMutation = useMutation(CONFIRM_SECRET, {
    variables: {
      secret: confirmInput.value,
      email: navigation.getParam("email")
    }
  });
  const handleConfirm = async () => {
    const { value } = confirmInput;
    if (value === "" || !value.includes(" ")) {
      return Alert.alert("시크릿 키를 다시 확인해주세요 🙄");
    }
    try {
      setLoading(true);
      const {
        data: { confirmSecret }
      } = await confirmSecretMutation();
      if (confirmSecret !== "" || confirmSecret !== false) {
        login(confirmSecret);
      } else {
        Alert.alert("일시적 오류입니다 😥");
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
          {...confirmInput}
          placeholder={"시크릿 키"}
          keyboardType={"default"}
          returnKeyType={"send"}
          onSubmitEditing={handleConfirm}
          autoCorrect={false}
        />
        <AuthButton
          state={"confirm"}
          onPress={handleConfirm}
          text={"로그인"}
          loading={loading}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
