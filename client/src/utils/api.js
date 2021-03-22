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
  updateUser(_id) {
    return this.axios.put(`/api/users/${_id}`);
  }
  deleteUser(_id) {
    return this.axios.delete(`/api/users/${_id}`);
  }
  getUser(_id) {
    return this.axios.post(`/api/users/${_id}`);
  }
  updatePassword(_id) {
    return this.axios.put(`/api/users/password/${_id}`);
  }

  //-----------------------causes api-------------------------//
  getUsersCauses(_id) {
    return this.axios.get(`/api/causes/${_id}`);
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
  updateCause(_id, data) {
    return this.axios.put(`/api/causes/${_id}`, data);
  }
  addLike(_id, like, data) {
    return this.axios.put(`/api/causes/like/${like}/${_id}`, data);
  }
  removeCause(_id, data) {
    return this.axios.delete(`/api/causes/${_id}`, data);
  }

  //-----------------------post api-------------------------//
  getAllPost() {
    return this.axios.get(`/api/posts/dashboard`);
  }
  findFollowing(data) {
    return this.axios.get(`/api/posts/following`, data);
  }
  findTrending(data) {
    return this.axios.get(`/api/posts/trending`, data);
  }
  createPost(data) {
    return this.axios.post(`/api/posts/dashboard`, data);
  }
  updatePost(_id, data) {
    return this.axios.put(`/api/posts/dashboard/${_id}`, data);
  }
  removePost(_id) {
    return this.axios.delete(`/api/posts/dashboard/${_id}`);
  }

  //-----------------------comment api-------------------------//
  getComments() {
    return this.axios.get(`/api/comments/`);
  }
  createComments(data) {
    return this.axios.get(`/api/comments/`, data);
  }
  updateComments(_id, data) {
    return this.axios.put(`/api/comments/${_id}`, data);
  }
  removeComments(_id) {
    return this.axios.delete(`/api/comments/${_id}`);
  }

  //-----------------------hashtags api-------------------------//
  getHashtagAll(data) {
    return this.axios.get(`/api/hashtags/`, data);
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
  updateHashtagComment(_id, data) {
    return this.axios.put(`/api/hashtags/${_id}`, data);
  }
  removeHashtag(_id) {
    return this.axios.delete(`/api/hashtags/${_id}`);
  }
}

export default new API();