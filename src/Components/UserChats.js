import { Avatar, AvatarBadge, Badge, Box, Flex } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { useFetchRecipientUser } from '../Hooks/useFetchRecipientUser'
import { ChatContext } from '../Context/ChatContext'
import { getUnreadNotifications } from '../Utilis/getUnreadNotifications'
import { useFetchLatestMessage } from '../Hooks/useFetchLatestMessages.js'
import moment from 'moment'

const UserChats = ({ user, chat }) => {
    const{getCurrentChat,onlineUsers,notifications,markThisUserNotificationsAsRead}=useContext(ChatContext)
    const { recipientUser } = useFetchRecipientUser(chat, user)
    const {latestMsg}=useFetchLatestMessage(chat)
    const unReadNotifications=getUnreadNotifications(notifications)
    const thisUserNotifications=unReadNotifications?.filter(n=>
         n.senderId===recipientUser?._id
    )

    const truncateMsg=(text)=>{
        let shortMsg=text.substring(0,20);
        if(text.length>20)
        shortMsg=shortMsg+"..."

        return shortMsg
    }
    return (
        <Box onClick={()=>{getCurrentChat(chat)
            if(thisUserNotifications.length!==0)
            markThisUserNotificationsAsRead(thisUserNotifications,notifications)
        }} as='button' _hover={{ bgColor: '#4a4a4a' }} fontFamily={'Raleway'} borderRadius={'8px'} color={'white'} padding={'10px'} px={'15px'}>
            <Flex gap={'1'} position={'relative'} direction={'row'}>
                <Box py='2px' px='6px'>
                    <Avatar >
                    <AvatarBadge display={  onlineUsers?.some((user)=>user?.userId===recipientUser?._id)?'block':'none'
                       } boxSize='0.8em' bg='green.500' />                    
                    </Avatar>
                </Box>
                <Flex gap={'3'} width={'100%'} justifyContent={'space-between'} mx='10px'>

                    <Box textAlign={'start'}>
                        <Box fontSize={'18px'} fontWeight={'600'}>{recipientUser?.name}</Box>
                        <Box fontSize={'14px'} fontWeight={'200'}>{latestMsg?.text&& <Box as='span'>{truncateMsg(latestMsg.text)}</Box>}</Box>
                    </Box>

                    <Box>
                        <Box fontSize={'11px'} fontWeight={'200'}>{moment(latestMsg?.createdAt).calendar()}</Box>

                    </Box>

                </Flex>
                {thisUserNotifications.length===0?'':
                <Badge display={'flex'} justifyContent={'center'} alignItems={'center'} borderRadius={'100%'} width={'20px'} height={'20px'} position={'absolute'} bottom={'2px'} right={'2px'} ml='1' fontSize='14px' bgColor={'#1daa61'} >
                    {thisUserNotifications?.length}
                </Badge>
}
            </Flex>
        </Box>
    )
}

export default UserChats
