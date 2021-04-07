import axios from "axios";

class API {
  axios;

  constructor() {
    this.axios = axios.create();
  }

  /**
   * @param {String} name
   * @param {String} value
   */
  setHeader(name, value) {
    if (value) this.axios.defaults.headers.common[name] = value;
    else delete this.axios.defaults.headers.common[name];
  }

  /**
   * @param {object} userData
   * @param {String} userData.email
   * @param {String} userData.password
   *
   * @returns {Promise}
   */
  register(userData) {
    return this.axios.post("/api/authenticate/register/personal", userData);
  }

  /**
   * @param {object} userData
   * @param {String} userData.email
   * @param {String} userData.password
   *
   * @returns {Promise}
   */
  login(userData) {
    return this.axios.post("/api/authenticate/login", userData);
  }

  authenticated() {
    return this.axios.post("/api/authenticated");
  }
  //----------------conversation api-----------------------//
  getConvoUser_id(_id) {
    return this.axios.get(`/api/messenger/${_id}`);
  }
  getMessages_id(_id) {
    return this.axios.get(`/api/messenger/${_id}`);
  }
  getLatestConvo(_id) {
    return this.axios.get(`/api/messenger/${_id}`);
  }
  createConvo(_id) {
    return this.axios.post(`/api/messenger/${_id}`);
  }
  updateConvo(_id) {
    return this.axios.put(`/api/messenger/${_id}`);
  }
  updateMessage(message, _id) {
    return this.axios.put(`/api/messenger/${message}/${_id}`);
  }

  //-----------------------user api-------------------------//
  async getAllUsers() {
    return this.axios.get(`/api/users`);
  }
  updateUser(id, data) {
    return this.axios.put(`/api/users/${id}`, data);
  }
  updateUserObjectID(id, data) {
    return this.axios.put(`/api/users/update/references/${id}`, data);
  }
  removeUserObjectID(id, data) {
    return this.axios.put(`/api/users/remove/references/${id}`, data);
  }
  deleteUser(_id) {
    return this.axios.delete(`/api/users/${_id}`);
  }
  getUser(_id) {
    return this.axios.get(`/api/users/${_id}`);
  }
  updatePassword(_id) {
    return this.axios.put(`/api/users/password/${_id}`);
  }
  findIfUserLikesCause(id, causeId) {
    return this.axios.get(`/api/users/liked/${id}/${causeId}`);
  }

  //-----------------------causes api-------------------------//
  getUsersCauses(id) {
    return this.axios.get(`/api/causes/${id}`);
  }
  getAllCauses() {
    return this.axios.get(`/api/causes/`);
  }
  getTrending(data) {
    return this.axios.get(`/api/causes/`, data);
  }
  createCause(data) {
    return this.axios.post(`/api/causes/`, data);
  }
  updateCause(id, data) {
    return this.axios.put(`/api/causes/${id}`, data);
  }
  addLike(id, like, data) {
    return this.axios.put(`/api/causes/like/${like}/${id}`, data);
  }
  removeCause(id, userId) {
    return this.axios.delete(`/api/causes/${id}/${userId}`);
  }

  //-----------------------post api-------------------------//
  getAllPost() {
    return this.axios.get(`/api/posts/`);
  }
  async findLikePost(id, user) {
    return this.axios.get(`/api/posts/findliked/${id}/${user}`);
  }
  async findUserPosts(id, user) {
    return this.axios.get(`/api/posts/single/${id}/`);
  }
  createPost(data) {
    return this.axios.post(`/api/posts/`, data);
  }
  updatePost(id, data) {
    return this.axios.put(`/api/posts/${id}`, data);
  }
  updateObjectID(id, data) {
    return this.axios.put(`/api/posts/object/${id}`, data);
  }
  removeliked(id, data) {
    return this.axios.put(`/api/posts/remove/like/${id}`, data);
  }
  removePost(id, userId) {
    return this.axios.delete(`/api/posts/remove/${id}/${userId}`);
  }

  //-----------------------comment api-------------------------//
  getComments() {
    return this.axios.get(`/api/comments/`);
  }
  createComments(data) {
    return this.axios.post(`/api/comments/`, data);
  }
  updateComments(_id, data) {
    return this.axios.put(`/api/comments/${_id}`, data);
  }
  removeComments(id, postId) {
    return this.axios.delete(`/api/comments/remove/${id}/${postId}`);
  }

  //-----------------------hashtags api-------------------------//
  getHashtagAll() {
    return this.axios.get(`/api/hashtags/`);
  }
  getHashtagPost(data) {
    return this.axios.get(`/api/hashtags/post`, data);
  }
  getHashtagCause(data) {
    return this.axios.get(`/api/hashtags/causes`, data);
  }
  getHashtagComment(data) {
    return this.axios.get(`/api/hashtags/comments`, data);
  }
  createHashtag(data) {
    return this.axios.post(`/api/hashtags/`, data);
  }
  updateHashtag(id, data) {
    return this.axios.put(`/api/hashtags/${id}`, data);
  }
  removeHashtag(_id) {
    return this.axios.delete(`/api/hashtags/${_id}`);
  }
  donate(data) {
    return this.axios.post("api/donations/pay", data);
  }
}

//-----------------------donate api-------------------------//

export default new API();
