import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

import React, { useState, useEffect } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import MainPage from "./MainPage";
import Report from "./Report";
import Login from "./Login";
import Register from "./Register";

import { connect, useDispatch } from "react-redux";
import { getLogin } from "./redux/actions/index";

function Navigation(props) {
  const [state, setState] = useState();
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState({ email: "", password: "" });
  const dispatch = useDispatch();

  async function StoredUser() {
    return (lgn = await AsyncStorage.getItem("user"));
  }
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    AsyncStorage.clear();
    StoredUser()
      .then((response) => setUser(response))
      .catch((e) => console.log(e));
  }, [StoredUser()]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    lgn = await AsyncStorage.getItem("status");

    console.log("LOGIN", lgn);
    dispatch(getLogin());
  }

  if (props?.login) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="MainPage"
          component={MainPage}
        />
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: "#202020",
            },
            headerTintColor: "#fff",
          }}
          name="Report"
          component={Report}
        />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={Register}
        />
      </Stack.Navigator>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};
export default connect(mapStateToProps, { getLogin })(Navigation);
