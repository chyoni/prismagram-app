import { createAppContainer, createStackNavigator } from "react-navigation";
import TabNavigation from "./TabNavigation";
import PhotoNavigation from "./PhotoNavigation";
import MessageNavigation from "./MessageNavigation";
import PostNavigation from "./PostNavigation";
const MainNavigation = createStackNavigator(
  {
    TabNavigation,
    PhotoNavigation,
    MessageNavigation,
    PostNavigation
  },
  {
    headerMode: "none",
    mode: "card"
  }
);

export default createAppContainer(MainNavigation);
