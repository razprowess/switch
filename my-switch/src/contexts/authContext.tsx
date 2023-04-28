import { createContext, useReducer } from "react";
import jwtDecode from "jwt-decode";

export type User = {
    email: string;
    exp: number;
    iat: number;
    id: number;
    role: string;
    username: string;
}


type IniitialStateProp = {
    user: null | User
}

//initial state has user prop that store the token which is a string
const iniitialState: IniitialStateProp = {
    user: null
}

if (localStorage.getItem("token")) {
    const decodedToken: User = jwtDecode(localStorage.getItem("token") as string);
    iniitialState.user = decodedToken
}

type Context = {
    user: User|null;
    login: (token: string)=> void;
    logout: ()=>void;
}

const contextArg: Context = {
    user: null,
    login: (token: string) => { },
    logout: () => { }
}
const AuthContext = createContext(contextArg);

const authReducer = (state: any, action: { type: any; payload?: any; }) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null
            }
        default:
            return state
    }
}


const AuthProvider = (props: any) => {
    const [state, dispatch] = useReducer(authReducer, iniitialState);

    const login = (token: string) => {
        localStorage.setItem('token', token);
        dispatch({
            type: 'LOGIN',
            payload: token
        })
    }
    const logout = () => {
        localStorage.removeItem('token');
        dispatch({ type: 'LOGOUT' })
    }

    return (
        <AuthContext.Provider value={{ user: state.user, login, logout }} {...props} />
    )
}

export { AuthContext, AuthProvider }
