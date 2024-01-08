import React, {createContext, useContext, useState} from "react";

const AuthContext = createContext();
const AuthProvider = ({children}) => {
    const [isLoginIn, setIsLoginIn] = useState(false);
    const login = () => {
        sessionStorage.setItem('isLogin', true);
        setIsLoginIn(JSON.parse(sessionStorage.getItem('isLogin')));
    }

    const logout = () => {
        setIsLoginIn(false)
        sessionStorage.setItem('isLogin', false);
    }
    return (
        <AuthContext.Provider value={{isLoginIn, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
export {AuthProvider, useAuth};