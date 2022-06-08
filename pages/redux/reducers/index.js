const INITIAL_STATE = {
  login: 0,
  email: "",
  password: "",
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_LOGIN":
      return { ...state, login: action.payload };
    case "GET_EMAIL":
      return { ...state, email: action.payload };
    case "GET_PASSWORD":
      return { ...state, password: action.payload };

    default:
      return state;
  }
};
