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
    return this.axios.put(`/api/${messageId}/${id}`);
  }

  //-----------------------user api-------------------------//
  updateUser(id) {
    return this.axios.put(`/api/user/${id}`);
  }
  deleteUser(id) {
    return this.axios.get(`/api/user/${id}`);
  }
  getUser(id) {
    return this.axios.post(`/api/user/${id}`);
  }
  updatePassword(id){
      return this.axios.post(`/api/user/password/${id}`);
  }
}

export default new API();