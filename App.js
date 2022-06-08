import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

import React, { useState, useEffect } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Navigation from "./pages/Navigation";
import Camera from "./pages/components/Camera";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducer } from "././pages/redux/reducers";
import ComponentManager from "./pages/components/ComponentManager";

const store = createStore(reducer, applyMiddleware(thunk));

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </Provider>
    );
    // return <Camera />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#303030",
    alignItems: "center",
    justifyContent: "center",
  },
  subContainer: {
    flex: 0.5,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    flex: 0.5,
    flexDirection: "row",
    marginBottom: 150,
  },
  touchableContainer: {
    backgroundColor: "#808080",
    borderWidth: 0.6,
    borderRadius: 20,
    marginTop: 110,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 6,
    height: "60%",
    width: "30%",
  },
  lastTextContainer: {
    marginBottom: 150,
  },
  title: {
    fontSize: 32,
    fontStyle: "italic",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontStyle: "italic",
    alignItems: "center",
    justifyContent: "center",
  },
  lastText: {
    fontSize: 20,
    fontStyle: "italic",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 110,
    height: 110,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
