import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const API = axios.create({ baseURL: serverUrl });
const token = JSON.parse(localStorage.getItem("token"));

export let addMessage = (formdata) => {
    const token = JSON.parse(localStorage.getItem("token"));

    return API.post(`/api/message`, formdata, { headers: { token } });
};
export let getMessage = (id) => {
    const token = JSON.parse(localStorage.getItem("token"));

    return API.get(`/api/message/${id}`, { headers: { token } });
};
export let deleteMessage = (messageId) => {
    const token = JSON.parse(localStorage.getItem("token"));

    return API.delete(`/api/message/${messageId}`, { headers: { token } });
};

export let updateMessage = (messageId, formData) => {
    const token = JSON.parse(localStorage.getItem("token"));

    return API.put(`/api/messageId/${messageId}`, formData, { headers: { token } });
};