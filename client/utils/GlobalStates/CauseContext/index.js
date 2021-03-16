import axios from "axios";
import {createContext} from "react"

export const CauseContext = createContext(null);

export default {
  getCausePost: async (causeData) => {
    return axios.get();
  }
}