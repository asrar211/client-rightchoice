import axios from "axios";

const instance = axios.create({
    baseURL: "https://rightchoice-vict.onrender.com",
    withCredentials: true,
});

export default instance;
