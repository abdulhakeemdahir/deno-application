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
  getConvoUserId(id) {
    return this.axios.get(`/api/messenger/${id}`);
  }
  getMessagesId(id) {
    return this.axios.get(`/api/messenger/${id}`);
  }
  createConvo(id) {
    return this.axios.post(`/api/messenger/${id}`);
  }
  updateConvo(id) {
    return this.axios.put(`/api/messenger/${id}`);
  }
  updateMessage(messageId, id) {
    return this.axios.put(`/api/messenger/${messageId}/${id}`);
  }

  //-----------------------user api-------------------------//
  updateUser(id) {
    return this.axios.put(`/api/users/${id}`);
  }
  deleteUser(id) {
    return this.axios.get(`/api/users/${id}`);
  }
  getUser(id) {
    return this.axios.post(`/api/users/${id}`);
  }
  updatePassword(id){
      return this.axios.post(`/api/users/password/${id}`);
  }

  //-----------------------causes api-------------------------//
  getUsersCauses(data) {
    return this.axios.get(`/api/causes/dashboard`, data);
  }
  getTrending(data) {
    return this.axios.get(`/api/causes/dashboard`, data);
  }
  createCause(data) {
    return this.axios.post(`/api/causes/create/cause`, data);
  }
  updateCause(_id){
      return this.axios.put(`/api/causes/${_id}`);
  }
  addLike(_id){
    return this.axios.put(`/api/causes/like/${_id}`);
  }
  removeCause(_id){
    return this.axios.delete(`/api/causes/${_id}`);
  }

  //-----------------------post api-------------------------//
  findFollowing(data) {
    return this.axios.get(`/api/posts/dashboard`, data);
  }
  findTrending(data) {
    return this.axios.get(`/api/posts/dashboard`, data);
  }
  createPost(data) {
    return this.axios.post(`/api/posts/dashboard`, data);
  }
  updatePost(_id){
      return this.axios.put(`/api/posts/dashboard/${_id}`);
  }
  removePost(_id){
    return this.axios.put(`/api/posts/dashboard/${_id}`);
  }

  //-----------------------comment api-------------------------//
  getComments(data) {
    return this.axios.get(`/api/comments/`, data);
  }
  createComments(data) {
    return this.axios.get(`/api/comments/`, data);
  }
  updateComments(_id){
      return this.axios.put(`/api/comments/${_id}`);
  }
  removeComments(_id){
    return this.axios.put(`/api/comments/${_id}`);
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
    updateHashtagComment(_id) {
      return this.axios.get(`/api/hashtags/${_id}`);
    }
    removeHashtag(_id) {
      return this.axios.post(`/api/hashtags/${_id}`);
    }
    
}

export default new API();