import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { useState } from "react";
import Constants from "expo-constants";

export default function App() {
  const [data, setData] = useState(null);

  const openAuthSessionAsync = async () => {
    try {
      let result = await WebBrowser.openAuthSessionAsync(
        `https://backend-xxswjknyfi.now.sh/?linkingUri=${Linking.createURL(
          "/?"
        )}`
      );
      let redirectData;
      if (result.url) {
        redirectData = Linking.parse(result.url);
      }
      setData(redirectData);
    } catch (err) {
      console.log(err);
    }
  };

  const openBrowserAsync = async () => {
    console.log(Linking.makeUrl("/?"));
    try {
      addLinkingListener();
      let result = await WebBrowser.openBrowserAsync(
        `https://backend-xxswjknyfi.now.sh/?linkingUri=${Linking.createURL(
          "/?"
        )}`
      );
    } catch (e) {
      console.log(e);
    }
  };

  const handleRedirect = (event) => {
    if (Constants.platform.ios) {
      WebBrowser.dismissBrowser();
    } else {
      removeLinking();
    }
    let data = Linking.parse(event.url);
    setData(data);
  };

  const removeLinking = () => {
    Linking.removeLinkingListener("url", handleRedirect);
  };
  const maybeRenderRedirectData = () => {
    if (!data) {
      return;
    }
    console.log(data);

    return <Text style={{ marginTop: 30 }}>{JSON.stringify(data)}</Text>;
  };

  const addLinkingListener = () => {
    Linking.addEventListener("url", handleRedirect);
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button
        title="Open with Browser Async"
        onPress={() => openBrowserAsync()}
      />
      <Button
        title="Open with Auth Session Asyn"
        onPress={() => openAuthSessionAsync()}
      />
      {maybeRenderRedirectData()}
    </View>
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
