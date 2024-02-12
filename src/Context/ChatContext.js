import { createContext, useCallback, useEffect, useState } from "react"
import { PostRequest, baseUrl, getRequest } from "../Utilis/services"
import { useToast } from "@chakra-ui/react"
import { io } from "socket.io-client";

export const ChatContext = createContext()

export const ChatContextProvider = ({ user, children }) => {

    const toast = useToast()
    const [userChats, setUserChats] = useState(null)
    const [isUserChatLoading, setIsUserChatLoading] = useState(false)
    const [potentialChats, setPotentialChat] = useState(null)
    const [allUsers, setAllUsers] = useState(null)
    const [currentChat, setCurrentChat] = useState(null)
    const [currentChatMessages, setCurrentChatMessages] = useState(null)
    const [iscurrentMessagesLoading, setIsCurrentMessagesLoading] = useState(false)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [notifications, setNotifications] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [socket, setSocket] = useState(null)
    const id = user?.id

    //Socket.io Connection
    useEffect(() => {
        const newSocket = io("http://localhost:9000")
        setSocket(newSocket)
        return () => {
            newSocket.disconnect()
        }
    }, [user])

    //Adding Online users
    useEffect(() => {
        if (socket == null) return
        socket.emit('addNewUser', id)
        socket.on('getOnlineUsers', (res) => {
            setOnlineUsers(res)
        })

        return () => {
            socket.off('getOnlineUsers')
        }
    }, [socket])

    //sendMessage
    useEffect(() => {
        if (socket === null) return
        console.log("member" ,currentChat)
        const recipientUserId = currentChat?.members.filter((id) => {
            return id !== user.id
        })

        socket.emit('sendMessage', { ...newMessage, recipientUserId: recipientUserId?.[0] })

    }, [newMessage])

    //Receive Message and Notifications
    useEffect(() => {
        if (socket == null) return
        socket.on('getMessage', (res) => {
            if (currentChat?._id !== res.chatId) return

            setCurrentChatMessages((prev) => [...prev, res])
        })
        socket.on('getNotifications', (res) => {
            const isChatOpen = currentChat?.members.some((id) => id === res.senderId)
            if (isChatOpen)
                setNotifications((prev) => [{ ...res, isRead: true }, ...prev]);
            else
                setNotifications((prev) => [res, ...prev]);
        })
        return () => {
            socket.off('getMessage')
            socket.off('getNotifications')
        }
    }, [socket, currentChat])

    useEffect(() => {
        const findUsers = async () => {
            const response = await getRequest(`${baseUrl}/api/user/`)

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
            setAllUsers(response)
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
    }, [user,notifications])


    useEffect(() => {
        const getMessages = async () => {

            setIsCurrentMessagesLoading(false)
            const response = await getRequest(`${baseUrl}/api/messages/getmessages/${currentChat?._id}`)
            setIsCurrentMessagesLoading(false)
            if (response.error) {
                return toast({
                    title: "Error Loading Messages",
                    description: response.message,
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                })
            }
            setCurrentChatMessages(response)

        }
        getMessages()
        // eslint-disable-next-line
    }, [currentChat])


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

        setUserChats((u) => [...u, response])
        // eslint-disable-next-line
    }, [])

    const getCurrentChat = useCallback((chat) => {
        setCurrentChat(chat)
    }, [])

    const sendMessage = useCallback(async (text, chatId, senderId, setTextMessage) => {
        if (!text) return (
            toast({
                title: "Message cannot to empty",
                status: 'error',
                duration: 4000,
                isClosable: true,
            }))

        const response = await PostRequest(`${baseUrl}/api/messages`, JSON.stringify({ text, chatId, senderId }))

        if (response.error) {
            return (
                toast({
                    title: "Message cannot be send",
                    description: response.error,
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                }))
        }
        setCurrentChatMessages((messages) => [...messages, response])
        setTextMessage('')
        setNewMessage(response)
        // eslint-disable-next-line
    }, [])

    const markAllNotificationsRead = useCallback((notifications) => {
        const readNotifications = notifications.map((n) => {
            return { ...n, isRead: true }
        })

        setNotifications(readNotifications)
    },[])

    const markNotificationAsRead = useCallback((n,userChats,notifications,user) => {
        const desiredChat = userChats.find((chat) => {
            const chatMembers = [user.id, n.senderId]

            const isDesired = chat?.members.every((member) => {
                return chatMembers.includes(member)
            })

            return isDesired
        })

        const ModifiedNotifications = notifications.map((note) => {
            if (note.senderId === n.senderId) 
            return { ...n, isRead: true }
            else return note
        })
        console.log('desiredChat',desiredChat)
        setCurrentChat(desiredChat)
        setNotifications(ModifiedNotifications)

    },[])

    const markThisUserNotificationsAsRead=useCallback((thisUserNotifications,notifications)=>{

        const mNotifications=notifications.map((note)=>{
            let notification={...note}

            const foundNotification=thisUserNotifications.find(n=>n.senderId==note.senderId)

            if(foundNotification)
            notification.isRead=true;

            return notification

        })
        setNotifications(mNotifications)

    },[])
    return (<ChatContext.Provider value={{markThisUserNotificationsAsRead,markNotificationAsRead,  markAllNotificationsRead, notifications, allUsers, onlineUsers, isUserChatLoading, userChats, potentialChats, createChat, getCurrentChat, currentChat, currentChatMessages, sendMessage, iscurrentMessagesLoading }}>
        {children}
    </ChatContext.Provider>
    )
}

