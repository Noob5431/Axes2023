import { useState, useRef, useMemo, useCallback } from "react";
import { View, StyleSheet, Text, Button, Image } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";
import { Camera, CameraType } from "expo-camera";
import axios from "axios";

// const _startCamera= async () => {

const App = () => {
  const cameraRef = useRef<Camera>(null);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  if (!permission) {
    Camera.requestCameraPermissionsAsync();
  }
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["20%", "80%"], []);
  const handleSheetChanges = useCallback((index: number) => {
    //console.log('handleSheetChanges', index);
  }, []);

  const takePicture = async () => {
    console.log(cameraRef.current);
    if (cameraRef.current) {
      // console.log("takePicture");
      const photo = await cameraRef.current.takePictureAsync();

      // console.log(photo.uri);
      var data = new FormData();
      data.append("image", {
        uri: photo.uri, // your file path string
        name: "image.jpg",
        type: "image/jpg",
      } as any); // change 'as any' to 'as Blob'
      // console.log(data["image"]["uri"]);
      // let response = await axios.post(
      //   "http://172.20.10.3:5000/register",
      //   data,
      //   {
      //     headers: { "Content-Type": "multipart/form-data" },
      //   }
      // );
      let response = await fetch("http://172.20.10.3:5000/register", {
        method: "post",
        body: data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      response = await response.json();
      console.warn(response);
    }
  };
  // const handleOnSubmit = async (e) => {
  //       e.preventDefault();
  //       let result = await fetch(
  //       'http://localhost:5000/register', {
  //           method: "post",
  //           body: JSON.stringify({licencePlate}),
  //           headers: {
  //               'Content-Type': 'application/json'
  //           }
  //       })
  //       result = await result.json();
  //       console.warn(result);
  //       if (result != 2) {
  //           alert("Search successful");
  //           setLicencePlate("");
  //       }
  //   }

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler>
        <View style={styles.floatContainer}>
          <Camera
            style={styles.cameraContainer}
            type={type}
            ref={cameraRef}
          ></Camera>
          <BottomSheet
            ref={bottomSheetRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
          >
            <View style={styles.text}>
              <Text>Awesome🎉</Text>
              <Button onPress={takePicture} title="suck" />
            </View>
          </BottomSheet>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  floatContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  cameraContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
    height: "82%",
    backgroundColor: "#f6f6f6",
  },
  text: {
    color: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
