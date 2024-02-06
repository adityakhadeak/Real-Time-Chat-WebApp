import { createContext, useCallback, useState } from "react";
import { baseUrl, registerUserPostRequest } from "../Utilis/services";
import { useToast } from "@chakra-ui/react";

export const AuthContext = createContext()

export const AuthContextProvider = (props) => {
    const toast=useToast()
    const [user, setUser] = useState(null)
    const[isLoadingRegister,setIsLoadingRegister]=useState(false)
    // const[isRegisterError,setIsRegisterError]=useState(null)
    const [registerUserInfo, setRegisterUserInfo] = useState({ name: "", email: "", password: "" })

    const updateRegisterInfo=useCallback((info)=>{
        setRegisterUserInfo(info)
    },[])

    const registerUser=useCallback(async()=>{
        setIsLoadingRegister(true)
        const response = await registerUserPostRequest(`${baseUrl}/api/user/register`,JSON.stringify(registerUserInfo))
        setIsLoadingRegister(false)

        if(response.error){
           return toast({
            title: "Error",
            description: response.message,
            status: 'error',
            duration: 4000,
            isClosable: true,
          })
        }
        
        setUser(response)
        toast({
            title: response.message,
            description: "Account Created Successfully",
            status: 'success',
            duration: 4000,
            isClosable: true,
          })
        setRegisterUserInfo({ name: "", email: "", password: "" })
    })

    return (<AuthContext.Provider value={{ user,setRegisterUserInfo, registerUserInfo,updateRegisterInfo,isLoadingRegister,registerUser }}>
        {props.children}
    </AuthContext.Provider>)
}