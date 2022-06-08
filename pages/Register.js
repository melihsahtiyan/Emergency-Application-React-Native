import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Button,
  TextInput,
  Pressable,
  Text,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect, useDispatch } from "react-redux";
import { getLogin } from "./redux/actions/index";

function Register(props) {
  const [user, setUser] = useState({
    email: "",
    password: "",
    identityNumber: "",
    firstName: "",
    lastName: "",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [result, setResult] = useState(false);
  const dispatch = useDispatch();

  async function register(
    email,
    password,
    identityNumber,
    firstName,
    lastName
  ) {
    const body = {
      email: email,
      password: password,
      identityNumber: identityNumber,
      firstName: firstName,
      lastName: lastName,
    };
    return await axios.post("http://10.0.2.2:5000/api/Auth/register", body);
  }

  function emailInputHandler(enteredText) {
    setEmail(enteredText);
  }

  function passwordInputHandler(enteredText) {
    setPassword(enteredText);
  }

  function onPressHandler() {
    console.log(email + "  " + password);

    register(email, password, identityNumber, firstName, lastName)
      .then((response) => {
        setResult(response.data.success),
          //   writeUserData(result.toString()),
          //   AsyncStorage.setItem("user", { email, password }),
          dispatch(getLogin({ a: true }));
      })
      .catch((e) => console.log(e));
  }

  async function writeUserData(result) {
    return await AsyncStorage.setItem("status", result.toString());
  }

  return (
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
        <TextInput
          style={styles.textInput}
          placeholder="First Name"
          placeholderTextColor="#666c72"
          onChangeText={(newFirstName) => setFirstName(newFirstName)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Last Name"
          placeholderTextColor="#666c72"
          onChangeText={(newLastName) => setLastName(newLastName)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Identity Number"
          placeholderTextColor="#666c72"
          onChangeText={(newIdentity) => setIdentityNumber(newIdentity)}
        />
      </View>
      <Pressable
        style={styles.button}
        touchSoundDisabled={true}
        onPress={onPressHandler}
      >
        <Text style={styles.register}>Register</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 85,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    fontSize: 24,
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
    fontSize: 24,
    color: "#ffd",
  },
  register: {
    fontSize: 22,
    color: "#303030",
  },
  button: {
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#06afff",
    width: 275,
    height: 40,
    borderRadius: 10,
  },
});
const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};
export default connect(mapStateToProps, { getLogin })(Register);
