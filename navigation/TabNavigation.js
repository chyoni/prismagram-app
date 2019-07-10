import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import { View, Image, Platform } from "react-native";
import Home from "../screens/Tabs/Home";
import Search from "../screens/Tabs/Search";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import DetailPost from "../screens/Post/DetailPost";
import PostComment from "../screens/Post/PostComment";
import MessageLink from "../components/MessageLink";
import NavIcon from "../components/NavIcon";
import Icon from "react-native-vector-icons/FontAwesome";
import IconHome from "react-native-vector-icons/MaterialCommunityIcons";
import { stackStyles } from "./config";

const stackFactory = (initialRoute, customConfig) =>
  createStackNavigator(
    {
      InitialRoute: {
        screen: initialRoute,
        navigationOptions: {
          ...customConfig
        }
      },
      DetailPost: {
        screen: DetailPost,
        navigationOptions: {
          headerTitle: "둘러보기"
        }
      },
      PostComment: {
        screen: PostComment,
        navigationOptions: {
          headerTitle: "댓글"
        }
      }
    },
    {
      defaultNavigationOptions: {
        headerStyle: { ...stackStyles },
        headerBackTitle: null,
        headerTintColor: "black"
      }
    }
  );

export default createBottomTabNavigator(
  {
    Home: {
      screen: stackFactory(Home, {
        title: "Home",
        headerRight: <MessageLink />,
        headerTitle: (
          <Image
            style={{ height: 35 }}
            resizeMode={"contain"}
            source={require("../assets/greyLogo.png")}
          />
        )
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <IconHome name={focused ? "home" : "home-outline"} size={30} />
        )
      }
    },
    Search: {
      screen: stackFactory(Search),
      navigationOptions: {
        tabBarIcon: ({ focused }) =>
          focused ? (
            <Icon name={"search"} size={29} />
          ) : (
            <NavIcon
              name={Platform.OS === "ios" ? "ios-search" : "md-search"}
              size={30}
            />
          )
      }
    },
    Add: {
      screen: View,
      navigationOptions: {
        tabBarOnPress: ({ navigation }) =>
          navigation.navigate("PhotoNavigation"),
        tabBarIcon: ({ focused }) => (
          <NavIcon
            name={
              Platform.OS === "ios"
                ? focused
                  ? "ios-add-circle"
                  : "ios-add-circle-outline"
                : focused
                ? "md-add-circle"
                : "md-add-circle-outline"
            }
            size={30}
          />
        )
      }
    },
    Notifications: {
      screen: stackFactory(Notifications),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            name={
              Platform.OS === "ios"
                ? focused
                  ? "ios-heart"
                  : "ios-heart-empty"
                : focused
                ? "md-heart"
                : "md-heart-empty"
            }
            size={30}
          />
        )
      }
    },
    Profile: {
      screen: stackFactory(Profile),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Icon name={focused ? "user" : "user-o"} size={28} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false,
      tabStyle: {
        backgroundColor: "#FAFAFA"
      }
    }
  }
);
