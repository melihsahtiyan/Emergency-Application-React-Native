import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeViewArea,
  Button,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  NativeModules,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { connect, useDispatch } from "react-redux";
import { getLogin, getEmail } from "./redux/actions/index";

import axios from "axios";

function Login(props) {
  const dispatch = useDispatch();
  const [user, setUser] = useState({ email: "", password: "" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    identityNumber: "",
    passwordHash: "",
    passwordSalt: "",
    birthDate: "",
    status: false,
  });
  const [status, setStatus] = useState(false);

  async function login(email, password) {
    const body = { email: email, password: password };
    return axios.post("http://10.0.2.2:5000/api/Auth/login", body);
  }

  function emailInputHandler(enteredText) {
    setEmail(enteredText);
  }

  function passwordInputHandler(enteredText) {
    setPassword(enteredText);
  }

  async function onPressHandler() {
    console.log("email :" + email + "  " + "password :" + password);
    login(email, password)
      .then(
        (response) => (
          setResult(response.data.data),
          setStatus(response.data.success.toString()),
          dispatch(getEmail({ a: email })),
          dispatch(getLogin({ a: true }))
          // AsyncStorage.setItem("user", email),
          // AsyncStorage.setItem("status", "true")
        )
      )
      .catch(function (error) {
        console.error(
          "There has been a problem with your fetch operation: " + error.message
        );
        throw error;
      });

    console.log("result :" + { result });
    console.log("status :" + status);
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1, backgroundColor: "#303030" }}
    >
      <View style={styles.container}>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            placeholderTextColor="#666c72"
            onChangeText={(newEmail) => setEmail(newEmail)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor="#666c72"
            onChangeText={(newPassword) => setPassword(newPassword)}
            secureTextEntry={true}
          />
          <View style={{ right: 15, width: 300 }}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("Register", {
                  category: 1,
                });
              }}
            >
              <Text style={styles.register}>Do you have an account?</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Button
          title="Login"
          style={styles.button}
          color="#ff0000"
          touchSoundDisabled={true}
          onPress={onPressHandler}
        />
        <View style={styles.textContainer}>
          <Text style={styles.screenInfoText}>Emergency Application</Text>
          <Text style={styles.screenInfoText}>Login Screen</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 50,
    flexDirection: "column",
    alignItems: "stretch",
    backgroundColor: "#303030",
  },
  textInputContainer: {
    padding: 50,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    marginTop: 40,
    marginBottom: 85,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    borderRadius: 10,
    fontSize: 20,
    borderWidth: 1,
    color: "#fff",
    borderColor: "#cccccc",
    backgroundColor: "#202020",
    width: 350,
    height: 45,
    marginTop: 15,
    padding: 8,
  },
  screenInfoText: {
    fontSize: 18,
    color: "#ffd",
  },
  register: {
    fontSize: 12,
    color: "#06afff",
  },
  button: {
    borderRadius: 15,
    fontSize: 36,
  },
});
const mapStateToProps = (state) => {
  return {
    login: state.login,
    email: state.email,
  };
};
export default connect(mapStateToProps, { getLogin, getEmail })(Login);
