import { useState, useRef, useMemo, useCallback } from 'react'
import { View, StyleSheet, Text, Button } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler'
import BottomSheet from '@gorhom/bottom-sheet';
import { Camera, CameraType } from 'expo-camera';

const App = () => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  if (!permission) {
    Camera.requestCameraPermissionsAsync();
  }
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['20%', '80%'], []);
  const handleSheetChanges = useCallback((index: number) => {
    //console.log('handleSheetChanges', index);
  }, []);
  return (
      <GestureHandlerRootView style={styles.container}>
        <PanGestureHandler>
          <View style={styles.floatContainer}>
            <Camera style={styles.cameraContainer} type={type}>
            </Camera>
            <BottomSheet
              ref={bottomSheetRef}
              index={1}
              snapPoints={snapPoints}
              onChange={handleSheetChanges}
            >
              <View style={styles.text}>
                <Text>Awesome🎉</Text>
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
    alignItems: 'center',
    backgroundColor: 'white',
  },
  cameraContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    height: "82%",
    backgroundColor: '#f6f6f6'
  },
  text: {
    color: "black",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;
