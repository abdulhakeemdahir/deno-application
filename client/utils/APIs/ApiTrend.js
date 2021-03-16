import axios from "axios";

export default {
  getNews: async (trendData) => {
    return axios.get(/api/posts);
  },
}