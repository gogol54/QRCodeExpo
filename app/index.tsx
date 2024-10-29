'use client'

import { 
  Link, 
  Stack, 
  useNavigation 
} from 'expo-router'
import { 
  StyleSheet, 
  SafeAreaView, 
  Text, 
  View,
  TouchableOpacity,
  Pressable
} from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useCameraPermissions } from 'expo-camera'

export default function Home() {

  const [permission, requestPermission] = useCameraPermissions()
  const isPermissionGranted = Boolean(permission?.granted)
  const navigate = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Overview', headerShown: false}} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">QR Code Scanner.</ThemedText>
          <TouchableOpacity  onPressIn={() => requestPermission()}>
            <Pressable onPress={requestPermission}>
              <Text style={styles.title}>Request Permission</Text>
            </Pressable>
          </TouchableOpacity>
          {permission?.granted &&
            <Pressable >
            <Link href="/scanner" style={styles.link}>
              <View style={styles.buttonBox}>
                <Text style={styles.btnAccess}>SCANEAR PDF</Text> 
              </View>
            </Link>
            </Pressable>
          }
         
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  title: {
    fontSize: 15,
    color:'aquamarine',
    textDecorationLine: 'underline',
  },
  buttonBox: {
    width: 120, //altura
    height: 50, //largura
    backgroundColor:'#434343',
    justifyContent: 'center',
    alignItems: 'center'

  },
  btnAccess: {
    fontSize: 15,
    color:'white',
  
  }
});
