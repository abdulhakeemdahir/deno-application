//user context they're posts who they follow etc
//post context holds info about specific pages post that we want to display
//set states as arrays that I can push into
import React, { createContext, useReducer, useContext } from "react";
import reducer from "./guessReducer";

const GuessContext = createContext();
const { Provider } = GuessContext;

const GuessProvider = ({ value = [], ...props }) => {
  const [guessState, guessDispatch] = useReducer(reducer, {
    _id: 0,

    //from user.js in models
    firstName: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    bio: "",
    uuid: "",
    role: "",
    verified: false,
    following: [],
    followers: [],
    posts: [],
    causes: [],
    profileImg: "",
    bannerImg: "",
    orgName: "",
    phoneNumber: "",
    website: "",
    address: "",
  });

  return <Provider value={[guessState, guessDispatch]} {...props} />;
};

const useGuessContext = () => {
  return useContext(GuessContext);
};

export { GuessProvider, useGuessContext };
