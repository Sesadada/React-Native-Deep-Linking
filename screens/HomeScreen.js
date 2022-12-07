import { StyleSheet, Text, TouchableOpacity, View, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Linking from "expo-linking";
import React from "react";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import Constants from "expo-constants";

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [outData, setOutData] = useState(null);

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

  const handleDeepLink = (event) => {
    let data = Linking.parse(event.url);
    setOutData(data);
  };

  useEffect(() => {
    async function getInitialUrl() {
      //to get link if app not open
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        setOutData(Linking.parse(initialUrl));
      }
    }
    const subscribe = Linking.addEventListener("url", handleDeepLink); //gets link if app open
    if (!data) {
      getInitialUrl();
    }
    return () => subscribe.remove();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "pink",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>HomeScreen</Text>
      <View style={styles.container}>
        <Button
          title="Open with Browser Async"
          onPress={() => openBrowserAsync()}
        />
        <Button
          title="Open with Auth Session Asyn"
          onPress={() => openAuthSessionAsync()}
        />
        {maybeRenderRedirectData()}
        <Text style={{ backgroundColor: "green" }}>
          {outData ? JSON.stringify(outData) : "no Data"}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "magenta",
          padding: 10,
          borderRadius: 10,
          marginVertical: 10,
        }}
      >
        <Text onPress={() => navigation.navigate("Settings")}>To settings</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
