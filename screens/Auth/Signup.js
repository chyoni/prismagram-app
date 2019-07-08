import React, { useState } from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { CREATE_ACCOUNT } from "./AuthQueries";
import constants from "../../constants";
import * as Facebook from "expo-facebook";
import { Google } from "expo";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const DivideLine = styled.View`
  border-top-width: 1px;
  border-color: ${props => props.theme.lightGreyColor};
  border-style: solid;
  width: ${constants.width / 1.1};
  margin-bottom: 20px;
`;

const FBContainer = styled.View``;

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

  const facebookLogin = async () => {
    try {
      setLoading(true);
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        "705072043285346",
        {
          permissions: ["public_profile", "email"]
        }
      );
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,last_name,first_name,email`
        );
        const {
          email: facebookEmail,
          first_name,
          last_name
        } = await response.json();
        updateFormData(facebookEmail, first_name, last_name);
        setLoading(false);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  const googleLogin = async () => {
    const GOOGLE_ID =
      "73037815285-7uijp1cjng0tq53cd5ukumc87o3m083i.apps.googleusercontent.com";
    try {
      setLoading(true);
      const result = await Google.logInAsync({
        iosClientId: GOOGLE_ID,
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        console.log(result);
        const user = await fetch("https://www.googleapis.com/userinfo/v2/me", {
          headers: { Authorization: `Bearer ${result.accessToken}` }
        });
        const {
          email: googleEmail,
          family_name,
          given_name
        } = await user.json();
        updateFormData(googleEmail, family_name, given_name);
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (socialEmail, socialFirstName, socialLastName) => {
    email.setValue(socialEmail);
    firstName.setValue(socialFirstName);
    lastName.setValue(socialLastName);
    const [socialUsername] = socialEmail.split("@");
    username.setValue(socialUsername);
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
        <DivideLine />
        <FBContainer>
          <AuthButton
            bgColor={"#3F82F8"}
            onPress={facebookLogin}
            text={"Facebook(으)로 연동"}
            loading={false}
          />
          <AuthButton
            bgColor={"#ED4956"}
            onPress={googleLogin}
            text={"Google(으)로 연동"}
            loading={false}
          />
        </FBContainer>
      </View>
    </TouchableWithoutFeedback>
  );
};
