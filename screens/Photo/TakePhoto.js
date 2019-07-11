import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Camera } from "expo-camera";
import Rotate from "react-native-vector-icons/Feather";
import { Ionicons } from "@expo/vector-icons";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import { TouchableOpacity } from "react-native";
import Loader from "../../components/Loader";
import constants from "../../constants";
import styles from "../../styles";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const CameraView = styled.View`
  flex: 1;
  width: ${constants.width};
  height: ${constants.height};
`;
const FlipView = styled.View`
  flex: 1;
  width: ${constants.width};
  align-items: center;
  background-color: transparent;
  flex-direction: row;
`;
const CaptureButton = styled.View`
  width: 85px;
  height: 85px;
  border-radius: 42px;
  border: 15px solid ${styles.lightGreyColor};
`;

const Text = styled.Text``;

export default ({ navigation }) => {
  const cameraRef = useRef();
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const takePhoto = async () => {
    try {
      const { uri } = await cameraRef.current.takePictureAsync({
        quality: 1
      });
      const asset = await MediaLibrary.createAssetAsync(uri);
      console.log(asset);
    } catch (e) {
      console.log(e);
    }
  };
  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status === "granted") {
        setHasPermission(true);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    askPermission();
  }, []);

  return (
    <>
      {loading ? (
        <View>
          <Loader />
        </View>
      ) : hasPermission ? (
        <CameraView>
          <Camera
            ref={cameraRef}
            focusDepth={1}
            type={cameraType}
            style={{ width: constants.width, height: constants.height / 2 }}
          >
            <FlipView>
              <TouchableOpacity
                style={{
                  alignSelf: "flex-start",
                  marginLeft: 12,
                  marginBottom: 10,
                  marginTop: constants.height / 2.4
                }}
                onPress={() =>
                  setCameraType(
                    cameraType === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  )
                }
              >
                <Rotate
                  name={"rotate-ccw"}
                  color={styles.whiteColor}
                  size={40}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginLeft: constants.width / 1.3,
                  marginRight: 12,
                  marginBottom: 13,
                  marginTop: constants.height / 2.4
                }}
                onPress={() =>
                  setFlashMode(
                    flashMode === Camera.Constants.FlashMode.off
                      ? Camera.Constants.FlashMode.on
                      : Camera.Constants.FlashMode.off
                  )
                }
              >
                <Ionicons
                  name={"ios-flash"}
                  color={
                    flashMode === Camera.Constants.FlashMode.on
                      ? "white"
                      : "black"
                  }
                  size={40}
                />
              </TouchableOpacity>
            </FlipView>
          </Camera>
          <View>
            <TouchableOpacity onPress={takePhoto}>
              <CaptureButton />
            </TouchableOpacity>
          </View>
        </CameraView>
      ) : null}
    </>
  );
};
