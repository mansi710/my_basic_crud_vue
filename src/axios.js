import axios from "axios";
axios.defaults.baseURL = " http://192.168.1.2:8000/api";
axios.defaults.headers.common["Authorization"] =
  "Baarer " + localStorage.getItem("token");
axios.defaults.headers["Accepts"] = "application/json";
