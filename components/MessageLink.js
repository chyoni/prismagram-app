import React from "react";
import styled from "styled-components";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { withNavigation } from "react-navigation";
import styles from "../styles";

const Container = styled.TouchableOpacity`
  padding-right: 10px;
`;

export default withNavigation(({ navigation }) => (
  <Container onPress={() => navigation.navigate("MessageNavigation")}>
    <Icon name={"paper-plane"} color={styles.blackColor} size={26} />
  </Container>
));
