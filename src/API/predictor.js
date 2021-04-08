import axios from "axios";

export default axios.create({
  baseURL: "https://predictor-web.herokuapp.com",
});
