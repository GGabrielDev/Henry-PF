import axios from "axios";

export default axios.create({
  baseURL: "https://hnery-pf.onrender.com",
  timeout: 8000,
});
