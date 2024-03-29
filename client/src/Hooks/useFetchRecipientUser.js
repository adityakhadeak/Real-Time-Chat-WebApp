import { useContext, useEffect, useState } from "react"
import { getRequest ,baseUrl} from "../Utilis/services"
import { ChatContext } from "../Context/ChatContext.js"


export const useFetchRecipientUser = (chat,user) => {
    const{currentChat}=useContext(ChatContext)
    const [recipientUser, setRecipientUser] = useState(null)

    useEffect(() => {
        const recipientUserId = chat?.members.filter((id) => {
            return id !== user.id
        })
        const getRecipientUser = async () => {
            if (!recipientUserId)
                return null
            const response = await getRequest(`${baseUrl}/api/user/getuser/${recipientUserId}`)
            // if (response.error) {
            //     return toast({
            //         title: "Error Loading RecipientUser",
            //         description: response.message,
            //         status: 'error',
            //         duration: 4000,
            //         isClosable: true,
            //     })
            // }
            setRecipientUser(response)
        }
        getRecipientUser()
        // eslint-disable-next-line
    }, [currentChat])

    return{recipientUser}
}