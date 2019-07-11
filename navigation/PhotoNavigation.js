import {
  createMaterialTopTabNavigator,
  createStackNavigator
} from "react-navigation";
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";
import { stackStyles } from "./config";
import styles from "../styles";

const PhotoTabs = createMaterialTopTabNavigator(
  {
    SelectPhoto: {
      screen: SelectPhoto,
      navigationOptions: {
        tabBarLabel: "라이브러리"
      }
    },
    TakePhoto: {
      screen: TakePhoto,
      navigationOptions: {
        tabBarLabel: "사진"
      }
    }
  },
  {
    tabBarPosition: "bottom",
    tabBarOptions: {
      indicatorStyle: {
        backgroundColor: styles.blackColor
      },
      labelStyle: {
        color: styles.blackColor,
        fontWeight: "600"
      },
      style: {
        ...stackStyles
      }
    }
  }
);

export default createStackNavigator(
  {
    PhotoTabs: {
      screen: PhotoTabs,
      navigationOptions: {
        title: "사진"
      }
    },
    UploadPhoto
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        ...stackStyles
      }
    }
  }
);
