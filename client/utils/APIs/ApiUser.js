import axios from "axios";

export default {
  getUser: async (userData) => {
    return axios.get(/api/posts);
  },
}