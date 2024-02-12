import { useContext, useEffect, useState } from "react"
import { ChatContext } from "../Context/ChatContext.js"
import { baseUrl, getRequest } from "../Utilis/services.js"

export const useFetchLatestMessage=(chat)=>{
const {newMessage,notifications}=useContext(ChatContext)
const [latestMsg, setLatestMsg] = useState(null)

useEffect(() => {
  const getMessages=async()=>{
    const response=await getRequest(`${baseUrl}/api/messages/getmessages/${chat._id}`)
    console.log(response)

    if(response.error)
    {
        console.log("Error Getting Messages")
    }

    const lastMsg=response[response.length-1];
    console.log(lastMsg)
    setLatestMsg(lastMsg)
  }

  getMessages()
}, [newMessage,notifications])

return {latestMsg}
}