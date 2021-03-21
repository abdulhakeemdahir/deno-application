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
      likes: [],
      // hashtag: "", redundant; also found in models
      // comments: {}, redundant; also found in models

      //from hashtag.js in models
      posts: {},
      causes: {},
      hashtag: "",
      comments: {},
    },
    
    posts: [
      {
        _id: 0,

        //from post.js in models
        title: "",
        author: {},
        content: "",
        date: "",
        likes: [],
        // hashtag: "", redundant; also found in models
        // comments: {}, redundant; also found in models

        //from hashtag.js in models
        following: [],
        posts: {},
        causes: {},
        hashtag: "",
        comments: {},
      },
    ],
  });

  return <Provider value={[postState, postDispatch]} {...props} />;
};

const usePostContext = () => {
  return useContext(PostContext);
};

export { PostProvider, usePostContext };
