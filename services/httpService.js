import axios from "axios";
// let token = localStorage.getItem("token")
// const token = localStorage.getItem('token')
// console.log(token);
const app = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    // headers: {
    //     'content-type': 'application/json',
    //     'accept': 'application/json',
    // }

    // headers: {
    //     authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjNiMzIyYzdmMDdlOTUxOWJjZjkyMSIsImlhdCI6MTY5MzczODYxNH0.-hLqCMnVXWOBlKmIyYOMamZC82RrylvJwYr_edIoySw'
    //     // authorization: `Bearer ${token}}`
    // }

});
if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
        app.defaults.headers['Authorization'] = `Bearer ${token}`;
    }
}

axios.interceptors.request.use(
    (config) => {
        config.withCredentials = true;

        // const token = window.localStorage.getItem('token') || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjNiMzIyYzdmMDdlOTUxOWJjZjkyMSIsImlhdCI6MTY5MzczNDg3OH0.oH-83vbmffCY5xzW5JLtFULTzecPOlvntX7vrsl8A5c";
        // window.console.log(token);
        // if (!token) {

        //     window.console.log("token not exist----------------");
        // }

        // config.headers.authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjNiMzIyYzdmMDdlOTUxOWJjZjkyMSIsImlhdCI6MTY5MzczODYxNH0.-hLqCMnVXWOBlKmIyYOMamZC82RrylvJwYr_edIoySw`;

        //     window.console.log("token exist----------------");
        // }

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
