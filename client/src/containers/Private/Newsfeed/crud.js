// import { useCauseContext } from "../../../utils/GlobalStates/CauseContext";
// import { usePostContext } from "../../../utils/GlobalStates/PostContext";
// import {
//   GET_CAUSE_INFO,
//   GET_ALL_CAUSE_INFO,
//   GET_POST_INFO,
//   GET_ALL_POST_INFO,
//   GET_TRENDING,
//   UPDATE_CAUSE,
//   UPDATE_POST,
//   CAUSE_LOADING,
//   REMOVE_CAUSE,
//   POST_LOADING,
//   REMOVE_POST,
//   GET_FOLLOWING,
// } from "../../../utils/actions/actions.js";

// import API from "../../../utils/api";

// //*CAUSES*
// const [causeState, causeDispatch] = useCauseContext();
// const [postState, postDispatch] = usePostContext();
// //Read cause
// const getCauseInfo = async (data) => {
//   causeDispatch({ type: CAUSE_LOADING });
//   const causeInfo = await API.getUsersCauses(data);
//   causeDispatch({
//     type: GET_CAUSE_INFO,
//     payload: {
//       currentCause: causeInfo,
//       loading: false,
//     },
//   });
// };

// const getAllCauseInfo = async () => {
//   causeDispatch({ type: CAUSE_LOADING });
//   const { data } = await API.getAllCauses();
//   causeDispatch({
//     type: GET_ALL_CAUSE_INFO,
//     payload: {
//       causes: [...data],
//       loading: false,
//     },
//   });
// };

// //Update cause
// const updateCauseInfo = async (id) => {
//   causeDispatch({ type: CAUSE_LOADING });
//   const data = await API.updateCause(id);
//   causeDispatch({
//     type: UPDATE_CAUSE,
//     payload: {
//       ...data,
//       loading: false,
//     },
//   });
// };

// //Delete cause
// const removeCause = async (id) => {
//   causeDispatch({ type: CAUSE_LOADING });
//   await API.deleteCause(id);
//   causeDispatch({
//     type: REMOVE_CAUSE,
//     payload: {
//       causes: causeState.causes.filter((cause) => {
//         return cause._id !== id;
//       }),
//       loading: false,
//     },
//   });
// };

// //*POSTS*

// //Read post
// const getPostInfo = async (data) => {
//   postDispatch({ type: POST_LOADING });
//   const postInfo = await API.getPost(data);
//   postDispatch({
//     type: GET_POST_INFO,
//     payload: {
//       currentPost: postInfo,
//       loading: false,
//     },
//   });
// };
// const getAllPostInfo = async () => {
//   postDispatch({ type: POST_LOADING });
//   const postInfo = await API.geAllPost();
//   postDispatch({
//     type: GET_ALL_POST_INFO,
//     payload: {
//       posts: [...postInfo],
//       loading: false,
//     },
//   });
// };

// const getFollowing = async (data) => {
//   postDispatch({ type: POST_LOADING });
//   const postInfo = await API.findFollowing(data);
//   postDispatch({
//     type: GET_FOLLOWING,
//     payload: {
//       following: [...postInfo],
//       loading: false,
//     },
//   });
// };

// const getTrending = async (data) => {
//   postDispatch({ type: POST_LOADING });
//   const postInfo = await API.findTrending(data);
//   postDispatch({
//     type: GET_TRENDING,
//     payload: {
//       trending: [...postInfo],
//       loading: false,
//     },
//   });
// };

// //Update post
// const updatePostInfo = async (id) => {
//   postDispatch({ type: POST_LOADING });
//   const data = await API.updatePost(id);
//   postDispatch({
//     type: UPDATE_POST,
//     payload: {
//       post: [...data],
//       loading: false,
//     },
//   });
// };

// //Delete post
// const deletePost = async (id) => {
//   postDispatch({ type: POST_LOADING });
//   await API.removePost(id);
//   postDispatch({
//     type: REMOVE_POST,
//     payload: {
//       posts: postState.posts.filter((post) => {
//         return post._id !== id;
//       }),
//       loading: false,
//     },
//   });
// };
