import { createStackNavigator } from "react-navigation";
import PostComment from "../screens/Post/PostComment";
import { stackStyles } from "./config";

export default createStackNavigator(
  {
    PostComment: {
      screen: PostComment,
      navigationOptions: {
        headerTitle: "댓글"
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        ...stackStyles
      }
    }
  }
);
