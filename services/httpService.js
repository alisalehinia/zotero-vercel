import axios from "axios";

const app = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,

});

axios.interceptors.request.use(
    (config) => {
        config.withCredentials = true;
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

const http = {
    get: app.get,
    post: app.post,
    delete: app.delete,
    put: app.put,
    patch: app.patch,
};

export default http;
