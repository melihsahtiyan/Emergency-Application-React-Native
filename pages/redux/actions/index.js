//import AsyncStorage from "@react-native-async-storage/async-storage";

export const getLogin = (a) => (dispatch) => {
  try {
    dispatch({ type: "GET_LOGIN", payload: a });
  } catch (error) {}
};

export const getEmail = (a) => (dispatch) => {
  try {
    dispatch({ type: "GET_EMAIL", payload: a });
  } catch (error) {}
};
export const getPassword = (a) => (dispatch) => {
  try {
    dispatch({ type: "PASSWORD", payload: a });
  } catch (error) {}
};
