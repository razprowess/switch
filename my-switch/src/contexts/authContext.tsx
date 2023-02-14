import { createContext, useReducer } from "react";
import jwtDecode from "jwt-decode";

// type User = {
//     profession?: string;
//     token: string | null;
//     __typename?: string;
// }

type IniitialStateProp = {
    user: null | string
}

//initial state has user prop that store the token which is a string
const iniitialState: IniitialStateProp = {
    user: null
}

if (localStorage.getItem("token")) {
    const decodedToken: string = jwtDecode(localStorage.getItem("token") as string);
    iniitialState.user = decodedToken
}

const AuthContext = createContext({
    user: null,
    login: (token: string) => { },
    logout: () => { }
})

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


// import { createContext, useReducer } from "react";
// import jwtDecode, { JwtPayload } from "jwt-decode";
// enum UserAuthState{
// LOGIN = "LOGIN",
// LOGOUT = "LOGOUT"
// }

// type jwtSign = {
//     id: number;
//     email: string
//     exp: number
// }

// type User = {
//     token: string;
//     email: string;
//     __typename: string;
// }

// type UserState = {
//     user: User | any
// }

// type UserAction = {
//     type: UserAuthState,
//     payload?: UserState | null
// }

// type ContextType = {
//     user: JwtPayload | null;
//     login: (user: User)=> void;
//     logout: ()=> void;
// }

// const iniitialState: UserState = {
//     user: null
// }

// if(localStorage.getItem('token')){
//     let token = localStorage.getItem('token') as string
//     const decodedToken = jwtDecode<JwtPayload>(token) || null;
//     if(decodedToken){
//         iniitialState.user = decodedToken
//     }
// }


// const AuthContext = createContext<ContextType>({
//     user: null,
//     login: (userData: User)=>{},
//     logout: ()=>{}
// });

// const authReducer = (state: UserState, action: UserAction)=>{
//     switch(action.type){
//         case UserAuthState.LOGIN:
//             return {
//                 ...state,
//                 user: action.payload
//             }
//         case UserAuthState.LOGOUT:
//             return {
//                 ...state, 
//         user: null
//             }
//     default: 
//     return state
//     }
// }

// const AuthProvider = (props: any) => {
//     const [state, dispatch] = useReducer(authReducer, iniitialState);
//     const login = (userData: any)=> {
//         console.log("user data: ", userData.loginUser);
//         const {token} = userData.loginUser
//        localStorage.setItem('token', token)
//        dispatch({
//            type: UserAuthState.LOGIN,
//            payload: userData.loginUser
//        })
//     }

//     const logout = ()=>{
//         localStorage.removeItem("token")
//         dispatch({
//             type: UserAuthState.LOGOUT
//         })
//     }

//     console.log("state: ", state.user)

//     return (
//         <AuthContext.Provider value={{user: state.user, login, logout}} 
//         {...props}
//         />
//         )
// }

// export {AuthContext, AuthProvider}