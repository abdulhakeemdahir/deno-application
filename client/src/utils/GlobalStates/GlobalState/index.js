import React, { createContext, useReducer, useContext } from "react";
import reducer from "./globalReducer";

const GlobalContext = createContext();
const { Provider } = GlobalContext;

const GlobalProvider = ({ value = [], ...props }) => {
  const [globalState, globalDispatch] = useReducer(reducer, {
    user:{
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
  },
    causes: [
      {
        _id: 0,

        //from cause.js in models
        title: "",
        author: {},
        content: "",
        date: "",
        category: "",
        likes: [],

        //from hashtag.js in models
        hashtags: [],
      },
    ],
    posts: [
      {
        _id: 0,

        //from post.js in models
        title: "",
        author: {},
        content: "",
        date: "",
        imageUrl: "",
        likes: [],
        hashtag: "",
        comments: [],
      },
    ],
    singlePosts: 
      {
        _id: 0,

        //from post.js in models
        title: "",
        author: {},
        content: "",
        date: "",
        imageUrl: "",
        likes: [],
        hashtag: "",
        comments: [],
      },
    guessUser:{
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
  },
  hashtag:[]
  });

  return <Provider value={[globalState, globalDispatch]} {...props} />;
};

const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalProvider , useGlobalContext };
