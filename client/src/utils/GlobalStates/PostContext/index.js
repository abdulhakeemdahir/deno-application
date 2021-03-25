import React, { createContext, useReducer, useContext } from "react";
import reducer from "./postReducer";

const PostContext = createContext();
const { Provider } = PostContext;

const PostProvider = ({ value = [], ...props }) => {
  const [postState, postDispatch] = useReducer(reducer, {
    trending: [],
    following: [],

    currentPost: {
      _id: 0,

      //from post.js in models
      title: "",
      author: {},
      content: "",
      date: "",
      imageUrl: "",
      likes: [],
      hashtags: [],
      comments: [],
    },

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
  });

  return <Provider value={[postState, postDispatch]} {...props} />;
};

const usePostContext = () => {
  return useContext(PostContext);
};

export { PostProvider, usePostContext };
