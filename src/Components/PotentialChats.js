import React, { useContext, useState } from 'react'
import { ChatContext } from '../Context/ChatContext.js'
import {
    Box, Text,
    Button,
    Flex,
    Avatar,

} from '@chakra-ui/react'
import { AuthContext } from '../Context/AuthContext.js'

const PotentialChats = () => {
    const { potentialChats, createChat } = useContext(ChatContext)
    const { user } = useContext(AuthContext)
    const [showNewChat, setShowNewChat] = useState(false)
    const showHideNewChat = () => {
        setShowNewChat(!showNewChat)
    }

    return (
        <Box >
            <Box display={'flex'} height='60px'>
                <Box position={'relative'} width={'100%'} justifyContent={'space-between'} display={'flex'}>
                    <Text fontSize={'20px'}>Chats</Text>
                    <Box >
                        <Button zIndex={'11'} onClick={showHideNewChat}>New</Button>
                        <Box zIndex={'11'} boxShadow={'base'} flexDirection={'column'} display={showNewChat ? 'flex' : 'none'} borderRadius={'10px'} top={'45px'} padding={'10px'} bgColor={'#292929'} width={'100%'} height={'30em'} position={'absolute'}>
                            <Text textAlign={'center'} display={potentialChats?.length===0?'block':'none'}>No available Users</Text> 
                                { potentialChats?.map((chat, index) => (
                                    <Box key={index} onClick={() => {
                                        createChat(chat._id, user.id)
                                        showHideNewChat()
                                    }} as='button' _hover={{ bgColor: '#4a4a4a' }} rounded={'8px'} my={'5px'} padding={'5px'} >
                                        <Flex alignItems={'center'} gap={'1'} position={'relative'} direction={'row'}>
                                            <Box py='2px' px='6px'>
                                                <Avatar />
                                            </Box>
                                            <Box px={'10px'} textAlign={'start'}>
                                                <Text mx={'10px'} fontSize={'15px'} fontWeight={'600'}>{chat.name}</Text>
                                            </Box>
                                        </Flex>
                                    </Box>
                                ))}
                        </Box>
                    </Box>

                </Box>
                <Box></Box>
            </Box>
            <Box onClick={showHideNewChat} position="fixed" top="0" left="0" width="100%" height="100%" zIndex={showNewChat ? "10" : "0"} bg="rgba(0, 0, 0, 0.5)" display={showNewChat ? "block" : "none"}></Box>
        </Box>
    )
}

export default PotentialChats
