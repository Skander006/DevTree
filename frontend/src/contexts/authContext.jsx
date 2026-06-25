import {createContext, useContext, useState} from "react";


const AuthContext = createContext();
export default function AuthProvider({children}){
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const login = (user, token)=>{
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        setUser(user);
    }

    const logout = ()=>{
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = ()=> useContext(AuthContext);