import React from "react";
import { View } from "react-native";
import NotificationPresenter from "./NotificationPresenter";
import { useQuery } from "react-apollo-hooks";
import { ME_ONLYNAME } from "../TabsQueries";
import Loader from "../../../components/Loader";

const NotificationContainer = () => {
  const { data, loading } = useQuery(ME_ONLYNAME);
  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Loader />
      </View>
    );
  } else {
    return <NotificationPresenter username={data.me.username} />;
  }
};

export default NotificationContainer;
