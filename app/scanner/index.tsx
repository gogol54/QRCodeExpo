import { 
  Link, 
  Stack 
} from 'expo-router'
import { 
  StyleSheet, 
  SafeAreaView, 
  Text,
  StatusBar,
  Platform,
  Linking,
  AppState
} from 'react-native'
import { Overlay } from './Overlay'
import { CameraView } from 'expo-camera'
import { useEffect, useRef } from 'react'

export default function QRcodeFunction() {
  const qrLock = useRef(false)
  const appState = useRef(AppState.currentState)

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if(appState.current.match(/inactive|background/) && nextAppState == "active"){
        qrLock.current = false
      }
      appState.current = nextAppState
    })
    return () => {
      subscription.remove()
    }
  }, [])

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <Stack.Screen options={{ title: 'Overview', headerShown: false}} />
      {Platform.OS === "android" ? <StatusBar hidden/> : null}

      <CameraView 
        style={StyleSheet.absoluteFillObject}
        facing='back'
        onBarcodeScanned={({data})=> {
          if(data && !qrLock.current){
            qrLock.current = true
            setTimeout(async () => {
              await Linking.openURL(data)
            }, 500);
          }
        }}
      />
      <Overlay />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  absoluteFillObject: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
    justifyContent: 'space-around',
    paddingVertical: 80,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
