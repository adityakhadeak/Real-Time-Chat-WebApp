import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, PostRequest } from "../Utilis/services";
import { useToast } from "@chakra-ui/react";

export const AuthContext = createContext()

export const AuthContextProvider = (props) => {
    const toast = useToast()
    const [user, setUser] = useState(null)
    const [isLoadingRegister, setIsLoadingRegister] = useState(false)
    const [isLoginLoading, setIsLoginLoading] = useState(false)

    const [registerUserInfo, setRegisterUserInfo] = useState({ name: "", email: "", password: "" })
    const [loginUserInfo, setLoginUserInfo] = useState({ email: "", password: "" })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        setUser(user)
        // eslint-disable-next-line
    }, [])

    const updateRegisterInfo = useCallback((info) => {
        setRegisterUserInfo(info)
    }, [])

    const updateLoginInfo = useCallback((info) => {
        setLoginUserInfo(info)
    }, [])

    //register a user
    const registerUser = useCallback(async () => {
        setIsLoadingRegister(true)
        const response = await PostRequest(`${baseUrl}/api/user/register`, JSON.stringify(registerUserInfo))
        setIsLoadingRegister(false)

        if (response.error) {
            return toast({
                title: "Error",
                description: response.message,
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
        }
        localStorage.setItem('user', JSON.stringify(response))
        setUser(response)
        // setRegisterUserInfo({ name: "", email: "", password: "" })
        toast({
            title: response.message,
            description: "Account Created Successfully",
            status: 'success',
            duration: 4000,
            isClosable: true,
        })
        // eslint-disable-next-line 
    }, [registerUserInfo])

    //login a user
    const loginUser = useCallback(async () => {
        setIsLoginLoading(true)
        const response = await PostRequest(`${baseUrl}/api/user/login`, JSON.stringify(loginUserInfo))
        setIsLoginLoading(false)

        if (response.error) {
            return toast({
                title: "Error",
                description: response.message,
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
        }
        console.log(response)
        localStorage.setItem('user', JSON.stringify(response))
        setUser(response)
        // setLoginUserInfo({ email: "", password: "" })
        toast({
            title: response.message,
            status: 'success',
            duration: 4000,
            isClosable: true,
        })
        // eslint-disable-next-line 
    }, [loginUserInfo])

    const logOut = useCallback(() => {
        localStorage.removeItem('user')
        setUser(null)
        toast({
            title: "Logged Out Successfully",
            status: 'success',
            duration: 4000,
            isClosable: true,
        })
        // eslint-disable-next-line 
    }, [])
    return (<AuthContext.Provider value={{ logOut, user, setRegisterUserInfo, registerUserInfo, setLoginUserInfo, updateLoginInfo, updateRegisterInfo, isLoadingRegister, registerUser, loginUser, isLoginLoading, loginUserInfo }}>
        {props.children}
    </AuthContext.Provider>)
}