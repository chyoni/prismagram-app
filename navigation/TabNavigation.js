import { createAppContainer, createBottomTabNavigator } from "react-navigation";
import { View } from "react-native";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Notifications from "../screens/Notifications";
import Profile from "../screens/Profile";

const TabNavigation = createBottomTabNavigator({
  Feed: {
    screen: Home,
    navigationOptions: {
      title: "Feed"
    }
  },
  Search,
  Add: {
    screen: View,
    navigationOptions: {
      tabBarOnPress: () => {
        console.log("Add");
      }
    }
  },
  Notifications,
  Profile
});

export default createAppContainer(TabNavigation);
