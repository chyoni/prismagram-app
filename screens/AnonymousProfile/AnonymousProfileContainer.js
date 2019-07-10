import React from "react";
import AnonymousProfilePresenter from "./AnonymousProfilePresenter";

export default class extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.getParam("username")
  });
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      username: navigation.getParam("username")
    };
  }

  render() {
    const { username } = this.state;
    return <AnonymousProfilePresenter username={username} />;
  }
}
