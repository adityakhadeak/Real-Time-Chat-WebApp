import { createContext, useEffect, useState } from "react"
import { baseUrl, getRequest } from "../Utilis/services"
import { useToast } from "@chakra-ui/react"

export const ChatContext = createContext()

export const ChatContextProvider = ({ user, children }) => {

    const toast = useToast()
    const [userChats, setUserChats] = useState(null)
    const [isUserChatLoading, setIsUserChatLoading] = useState(false)
    useEffect(() => {
        const getUserChats = async () => {
            const id = user?.id
            if (id) {
                setIsUserChatLoading(true)
                const response = await getRequest(`${baseUrl}/api/chats/${id}`)
                setIsUserChatLoading(false)
                if (response.error) {
                    return toast({
                        title: "Error Loading Chats",
                        description: response.message,
                        status: 'error',
                        duration: 4000,
                        isClosable: true,
                    })
                }
                setUserChats(response)
            }
        }
        getUserChats()


    }, [user])


    return (<ChatContext.Provider value={{ isUserChatLoading, userChats }}>
        {children}
    </ChatContext.Provider>
    )
}

