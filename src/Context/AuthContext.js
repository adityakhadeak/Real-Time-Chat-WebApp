import { createContext, useState } from "react";

export const AuthContext = createContext()

export const AuthContextProvider = (props) => {

    const [user, setUser] = useState(null)

    const [registerUser, setRegisterUser] = useState({ name: "", email: "", password: "" })

    return (<AuthContext.Provider value={{ setRegisterUser, registerUser }}>
        {props.children}
    </AuthContext.Provider>)
}