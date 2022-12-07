import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import * as Linking from "expo-linking";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import SettingScreen from "./screens/SettingScreen";

const prefix = Linking.createURL("/");
console.log(prefix);
export default function App() {
  const Stack = createNativeStackNavigator();

  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        Home: "home",
        Settings: {
          screens: { Messages: "messages", Feed: "feed" },
        },
      },
    },
  };

  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    //   <Button
    //     title="Open with Browser Async"
    //     onPress={() => openBrowserAsync()}
    //   />
    //   <Button
    //     title="Open with Auth Session Asyn"
    //     onPress={() => openAuthSessionAsync()}
    //   />
    //   {maybeRenderRedirectData()}
    //   <Text style={{ backgroundColor: "green" }}>
    //     {outData ? JSON.stringify(outData) : "no Data"}
    //   </Text>
    // </View>
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Settings" component={SettingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
