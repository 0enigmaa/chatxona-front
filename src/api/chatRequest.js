import axios from "axios";
const serverUrl = process.env.REACT_APP_SERVER_URL;
const API = axios.create({ baseURL: serverUrl });
const token = JSON.parse(localStorage.getItem("token"));


export let findChat = (firstId, secondId) => {
    const token = JSON.parse(localStorage.getItem("token"));

    return API.get(`/api/chat/${firstId}/${secondId}`, { headers: { token } });
};
export let getUserChat = () => {
    const token = JSON.parse(localStorage.getItem("token"));

    return API.get(`/api/chat`, { headers: { token } });
};
export let deleteChat = (chatId) => {
    const token = JSON.parse(localStorage.getItem("token"));

    return API.delete(`/api/chat/${chatId}`, { headers: { token } });
};