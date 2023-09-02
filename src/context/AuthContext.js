import http from "services/httpService";
import { createContext, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { useReducerAsync } from "use-reducer-async";
import Router from "next/router"
const AuthContext = createContext();
const AuthContextDispatcher = createContext();


const initialState = { user: null, loading: true, error: null };
const reducer = (state, action) => {
    switch (action.type) {
        case "SIGNIN_PENDING":
            return { loading: true, user: null, error: null }
        case "SIGNIN_SUCCESS":
            return { loading: false, user: action.payload, error: null }
        case "SIGNIN_REJECT":
            return { loading: false, user: null, error: action.error }
        default: return { ...state }
    }
}
const asyncActionHandlers = {
    SIGNIN: ({ dispatch }) =>
        (action) => {
            dispatch({ type: "SIGNIN_PENDING" })
            http.post("/users/login", action.payload).then(({ data }) => {
                toast.success("خوش امدید");
                dispatch({ type: "SIGNIN_SUCCESS", payload: data.data })
                Router.push("/")
            }).catch((err) => {
                dispatch({ type: "SIGNIN_REJECT", error: err?.response?.data?.message })
                // toast.error(err?.response?.data?.message)
            })
        },
    SIGNUP: ({ dispatch }) =>
        (action) => {
            dispatch({ type: "SIGNIN_PENDING" })
            http.post("/users/signup", action.payload).then(({ data }) => {
                console.log(data);
                toast.success("ثبت نام با موفقیت انجام شد");
                dispatch({ type: "SIGNIN_SUCCESS", payload: data.data })
                Router.push("/")
            }).catch((err) => {
                dispatch({ type: "SIGNIN_REJECT", error: err?.response?.data?.message })
                // toast.error(err?.response?.data?.message)
            })
        },
    LOAD_USER: ({ dispatch }) =>
        (action) => {
            dispatch({ type: "SIGNIN_PENDING" })
            http.get("/users/me").then(({ data }) => {
                console.log(data);
                dispatch({ type: "SIGNIN_SUCCESS", payload: data.data })
            }).catch((err) => {
                dispatch({ type: "SIGNIN_REJECT", error: err?.response?.data?.message })
            })
        },
    SIGNOUT: ({ dispatch }) =>
        (action) => {
            http.delete("/users/logout").then((response) => {
                console.log(response);
                // console.log(data.data);
                window.location.href = "/";
                console.log("log ----------------- out");
            }).catch((err) => {
                console.log(err);
                console.log("zzzzzzzzzzzzzzzzz");
            })
        },

}
const AuthProvider = ({ children }) => {
    const [user, dispatch] = useReducerAsync(reducer, initialState, asyncActionHandlers);
    useEffect(() => {
        dispatch({ type: "LOAD_USER" })
    }, [dispatch])
    return (
        <AuthContext.Provider value={user}>
            <AuthContextDispatcher.Provider value={dispatch}>
                {children}
            </AuthContextDispatcher.Provider>
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);  //?means: go and see what is the passed value to AuthContext 
export const useAuthActions = () => useContext(AuthContextDispatcher);  //?means: go and see what is the passed value to AuthContextDispatcher