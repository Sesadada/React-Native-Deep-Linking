import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FeedScreen from "./FeedScreen";
import MessagesScreen from "./MessagesScreen";

const Tab = createBottomTabNavigator();
const SettingScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
    </Tab.Navigator>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({});
