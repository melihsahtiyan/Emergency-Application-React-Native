import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Image,
  NativeModules,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { connect, useDispatch } from "react-redux";
import { getLogin } from "./redux/actions/index";

function MainPage(props) {
  const dispatch = useDispatch();

  async function exit() {
    dispatch(getLogin({ a: false }));
    // await AsyncStorage.setItem("status", "false");

    NativeModules.DevSettings.reload();
  }

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Image
          style={styles.image}
          source={require("./../assets/app-logo.png")}
        />
        <Text style={styles.title}>Emergency!</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.touchableContainer}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Report", {
                category: 1,
              });
            }}
          >
            <Image
              style={{
                width: 110,
                height: 110,
                justifyContent: "space-between",
                alignItems: "center",
              }}
              source={require("./../assets/hospital.png")}
            />
          </TouchableOpacity>
          <Text style={styles.text}>Hospital</Text>
        </View>
        <View style={styles.touchableContainer}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Report", {
                category: 2,
              });
            }}
          >
            <Image
              style={{
                width: 110,
                height: 110,
                justifyContent: "space-between",
                alignItems: "center",
              }}
              source={require("./../assets/police-station.png")}
            />
          </TouchableOpacity>
          <Text style={styles.text}>Police</Text>
        </View>
        <View style={styles.touchableContainer}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Report", {
                category: 3,
              });
            }}
          >
            <Image
              style={{
                width: 110,
                height: 110,
                justifyContent: "space-between",
                alignItems: "center",
              }}
              source={require("./../assets/fire-station.png")}
            />
          </TouchableOpacity>
          <Text style={styles.text}>Fire</Text>
        </View>
      </View>
      <View style={styles.lastTextContainer}>
        <Text style={styles.lastText}>
          What is your required Emergency Service?
        </Text>
      </View>
      <TouchableOpacity onPress={() => exit()} style={{ marginBottom: 20 }}>
        <Text style={{ color: "white", fontSize: 14 }}>Exit</Text>
      </TouchableOpacity>
    </View>
  );
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
    backgroundColor: "#303030",
    right: 4,
    borderColor: "#000000",
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
    color: "#ccc",
  },
  text: {
    fontSize: 16,
    fontStyle: "italic",
    alignItems: "center",
    justifyContent: "center",
    color: "#ccc",
  },
  lastText: {
    fontSize: 20,
    fontStyle: "italic",
    alignItems: "center",
    justifyContent: "center",
    color: "#ccc",
  },
  image: {
    width: 110,
    height: 110,
    justifyContent: "space-between",
    alignItems: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};
export default connect(mapStateToProps, { getLogin })(MainPage);
