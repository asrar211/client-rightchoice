import axios from "axios";

const instance = axios.create({
    baseURL: "https://server-rightchoice.vercel.app/",
    withCredentials: true,
});

export default instance;