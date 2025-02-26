import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const API = axios.create({ baseURL: serverUrl });
const token = JSON.parse(localStorage.getItem("token"));


export let getAllUser = () => API.get("/api/user");
export let getUser = (id) => API.get(`/api/user/${id}`);

export let updateUser = (id, formdata) => {

    const token = JSON.parse(localStorage.getItem("token"));

    return API.put(`/api/user/${id}`, formdata, { headers: { token } });
};


export let deleteUser = (id) => {
    return API.delete(`/api/user/${id}`, { headers: { token } });
};