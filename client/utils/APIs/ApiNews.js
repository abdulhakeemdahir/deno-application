import axios from "axios"

export default {
  getNews: async (newsData) => {
    return axios.get(/api/posts);
  },
}