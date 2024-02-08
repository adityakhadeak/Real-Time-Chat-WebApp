import { createContext, useCallback, useEffect, useState } from "react"
import { PostRequest, baseUrl, getRequest } from "../Utilis/services"
import { useToast } from "@chakra-ui/react"

export const ChatContext = createContext()

export const ChatContextProvider = ({ user, children }) => {

    const toast = useToast()
    const [userChats, setUserChats] = useState(null)
    const [isUserChatLoading, setIsUserChatLoading] = useState(false)
    const [potentialChats, setPotentialChat] = useState(null)
    const id = user?.id

    useEffect(() => {
        const findUsers = async () => {
            const response = await getRequest(`${baseUrl}/api/user/`)
            console.log(response)

            if (response.error) {
                return toast({
                    title: "Error Loading Chats",
                    description: response.message,
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                })
            }

            const pChats = response.filter((u) => {
                let isChatCreated = false
                if (id === u._id) return false

                if (userChats) {
                    isChatCreated = userChats.some((chat) => {
                        return chat.members[0] === u._id || chat.members[1] === u._id
                    })
                }
                return !isChatCreated
            })
            setPotentialChat(pChats)
        }
        findUsers()
        // eslint-disable-next-line
    }, [userChats])


    useEffect(() => {
        const getUserChats = async () => {
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
        // eslint-disable-next-line
    }, [user])

    const createChat = useCallback(async (firstId, secondId) => {
        const response = await PostRequest(`${baseUrl}/api/chats`, JSON.stringify({ firstId, secondId }))

        if (response.error) {
            return toast({
                title: "Error Creating Chat",
                description: response.message,
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
        }

        setUserChats((u)=>[...u, response])
        // eslint-disable-next-line
    }, [])

    return (<ChatContext.Provider value={{ isUserChatLoading, userChats, potentialChats, createChat }}>
        {children}
    </ChatContext.Provider>
    )
}

