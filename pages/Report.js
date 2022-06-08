import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import { useState, useEffect } from "react";

import GetLocation from "react-native-get-location";

import { connect, useDispatch } from "react-redux";
import { getLogin, getEmail } from "./redux/actions/index";

import axios from "axios";

import { NavigationContainer } from "@react-navigation/native";

import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

function Report(props) {
  const dispatch = useDispatch();

  const [isDisabled, setIsDisabled] = useState(true);

  const [image, setImage] = useState();
  const [video, setVideo] = useState();

  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState(props.email.a);
  const [user, setUser] = useState({
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
  const [coordinate, setCoordinate] = useState({});

  const id = props.route.params.category;

  // useEffect(() => {
  //   GetLocation.getCurrentPosition({
  //     enableHighAccuracy: true,
  //     timeout: 15000,
  //   })
  //     .then((location) => {
  //       setCoordinate({
  //         latitude: location.latitude,
  //         longitude: location.longitude,
  //       });
  //     })
  //     .catch((error) => {
  //       const { code, message } = error;
  //       console.warn(code, message);
  //     });
  // });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Image,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Video,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setVideo(result.uri);
    }
  };

  useEffect(() => {
    getByEmail(email)
      .then((result) => setUser(result.data))
      .catch(function (error) {
        console.error(
          "There has been a problem with your fetch operation: " + error.message
        );
        throw error;
      });
  });

  useEffect(() => {
    getById(id)
      .then((result) => setCategory(result.data.data))
      .catch(function (error) {
        console.error(
          "There has been a problem with your fetch operation: " + error.message
        );
        throw error;
      });
  });

  function getById(id) {
    return axios.get("http:10.0.2.2:5000/api/Categories/getbyid", {
      params: { id: id },
    });
  }

  function getByEmail(email) {
    return axios.get("http:10.0.2.2:5000/api/Users/getbyemail", {
      params: { email: email },
    });
  }

  function sendReport(description) {
    if (image != null) {
      return axios.post("http:10.0.2.2:5000/api/Posts/add", {
        userId: user.id,
        categoryId: category.id,
        description: description,
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
      });
    }

    return axios.post("http:10.0.2.2:5000/api/Posts/add", {
      userId: user.id,
      categoryId: category.id,
      description: description,
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    });
  }

  // console.log(email);

  function buttonHandler() {
    setEmail(dispatch({ type: getEmail() }));
    sendReport(description).then(() => setIsDisabled(false));
    console.log("description :" + description);
    console.log("email :" + email);
    console.log("user id :" + user);
    console.log("categoryId :" + category.id);
    console.log("latitude :", coordinate.latitude);
    console.log("longitude :", coordinate.longitude);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category.categoryName}</Text>
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.longTextInput}
            placeholder="Describe your situation, don't worry we are here."
            placeholderTextColor="#666c72"
            onChangeText={(newtDescription) => setDescription(newtDescription)}
            defaultValue={description}
          />
          <Pressable
            disabled={() => isDisabled}
            style={styles.button}
            onPress={buttonHandler}
          >
            <Text style={styles.text}>Send report!</Text>
          </Pressable>
          <View>
            <Pressable
              disabled={() => isDisabled}
              style={styles.button}
              onPress={pickImage}
            >
              <Text style={styles.text}>Image</Text>
            </Pressable>
            <Pressable
              disabled={() => isDisabled}
              style={styles.button}
              onPress={pickVideo}
            >
              <Text style={styles.text}>Video</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
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
  inputContainer: {
    flex: 0.9,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 150,
    marginBottom: 24,
  },
  textInput: {
    borderWidth: 0.8,
    borderColor: "#cccccc",
    width: 350,
    borderRadius: 3,
    marginRight: 8,
    padding: 8,
  },
  longTextInput: {
    borderWidth: 0.8,
    borderColor: "#cccccc",
    color: "#cccccc",
    width: 350,
    height: 100,
    borderRadius: 3,
    marginRight: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    marginTop: 50,
    color: "#cccccc",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 22,
    color: "#fff",
  },
  button: {
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff0000",
    width: 175,
    height: 30,
    borderRadius: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    login: state.login,
    email: state.email,
  };
};

export default connect(mapStateToProps, { getLogin, getEmail })(Report);
