//user context they're posts who they follow etc
//post context holds info about specific pages post that we want to display
//set states as arrays that I can push into
import React, { createContext, useReducer, useContext } from "react";
import reducer from "./userReducer";

const UserContext = createContext();
const { Provider } = UserContext;

const UserProvider = ({ value = [], ...props }) => {
  const [userState, userDispatch] = useReducer(reducer, {
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

  return <Provider value={[userState, userDispatch]} {...props} />;
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, useUserContext };
