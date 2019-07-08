import React, { useState } from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { CREATE_ACCOUNT } from "./AuthQueries";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const FBContainer = styled.View`
  padding-top: 20px;
  border-top-width: 1px;
  border-color: ${props => props.theme.lightGreyColor};
  border-style: solid;
`;

export default ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const username = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("");
  const signupMutation = useMutation(CREATE_ACCOUNT, {
    variables: {
      username: username.value,
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value
    }
  });

  const handleSignup = async () => {
    const { value: usernameValue } = username;
    const { value: firstNameValue } = firstName;
    const { value: lastNameValue } = lastName;
    const { value: emailValue } = email;
    if (
      usernameValue === "" ||
      firstNameValue === "" ||
      lastNameValue === "" ||
      emailValue === ""
    ) {
      return Alert.alert("모든 내용은 필수 사항입니다 🙄");
    } else if (
      !emailValue.includes("@") ||
      !emailValue.includes(".") ||
      !emailRegex.test(emailValue)
    ) {
      return Alert.alert("이메일 양식을 확인해주세요 🙄");
    }
    try {
      setLoading(true);
      const {
        data: { createAccount }
      } = await signupMutation();
      if (createAccount) {
        Alert.alert("회원가입이 성공적으로 완료되었습니다 😍");
        setTimeout(() => navigation.navigate("Login"), 1500);
      } else {
        Alert.alert("일시적 오류입니다 😥");
      }
    } catch (e) {
      Alert.alert("이미 존재하는 아이디 혹은 이메일입니다 😥");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...username}
          placeholder={"아이디(Username)"}
          returnKeyType={"next"}
          autoCorrect={false}
        />
        <AuthInput
          {...firstName}
          placeholder={"성(first Name)"}
          returnKeyType={"next"}
          autoCorrect={false}
        />
        <AuthInput
          {...lastName}
          placeholder={"이름(last Name)"}
          returnKeyType={"next"}
          autoCorrect={false}
        />
        <AuthInput
          {...email}
          placeholder={"이메일(Email)"}
          keyboardType={"email-address"}
          returnKeyType={"done"}
          autoCorrect={false}
        />
        <AuthButton
          onPress={handleSignup}
          text={"회원가입"}
          loading={loading}
        />
        <FBContainer>
          <AuthButton
            onPress={() => null}
            text={"페이스북으로 로그인"}
            loading={false}
          />
        </FBContainer>
      </View>
    </TouchableWithoutFeedback>
  );
};
