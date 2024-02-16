import { Avatar, Box, Button, Grid, GridItem, HStack, Icon,  Text } from '@chakra-ui/react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ChatContext } from '../Context/ChatContext.js'
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { useFetchRecipientUser } from '../Hooks/useFetchRecipientUser';
import { AuthContext } from '../Context/AuthContext';
import { VscSend } from "react-icons/vsc";
import moment from 'moment'
import InputEmoji from 'react-input-emoji'
const msg_From_user = {
    right: '10px'
}
const msg_From_Recipient = {
    left: '10px',
    background:'#4a4a4a'
}
const ChatBox = () => {
    const { currentChat, currentChatMessages,sendMessage } = useContext(ChatContext)
    const { user } = useContext(AuthContext)
    const { recipientUser } = useFetchRecipientUser(currentChat, user)
    const[text,setTextMessage]=useState('')
    const scroll=useRef()

    useEffect(() => {
        scroll.current?.scrollIntoView({behavior:"smooth"})
    }, [currentChatMessages])
    

    return (
        currentChat ? (
            <Grid fontFamily={'Raleway'} height='100%' templateColumns={'auto'} templateRows={'65px 520px 45px'} >
                <GridItem borderBottom='0.3px solid #343232'>
                    <HStack px={'10px'} spacing={'10px'}>
                        <Box padding={'5px'}><Avatar size='md' /></Box>
                        <Box padding={'10px'} fontWeight={600}>{recipientUser?.name}</Box>
                    </HStack>
                </GridItem>
                <GridItem py={'10px'} bgImage=''>
                    <Box className='chat-Box-Scroll-bar' width={'100%'} height={'100%'} display={'flex'} overflowY={'scroll'} gap={20} flexDirection={'column'} padding={'10px'} >
                        {
                            currentChatMessages.map((message, index) => (
                                <Box ref={scroll} key={index} position={'relative'} padding={'8px'}>
                                    <Box minWidth={'100px'} width={'fit-content'} height={'60px'} bgColor={'#005c4b'} rounded={10} p={'10px'} sx={message.senderId !== user.id ?msg_From_Recipient:msg_From_user } position={'absolute'}>
                                        <Text as="span">{message.text}</Text>
                                        <Text right={'10px'} bottom={'2px'} position={'absolute'} fontSize={'12px'}>{moment(message.createdAt).format('hh::mm')}</Text>

                                    </Box>
                                </Box>
                            ))
                        }
                    </Box>
                </GridItem>
                <GridItem borderTop={'0.3px solid #343232'} width={'100%'}>
                    <Box height={'100%'} px={'10px'} display={'flex'} alignItems={'center'} justifyContent={'space-between'}  >

                        <Box  width={'95%'}>
                            <InputEmoji value={text}  keepOpened cleanOnEnter  onChange={setTextMessage} placeholder='Type a message' borderRadius={'10px'}  />
                        </Box>
                        <Button onClick={()=>{sendMessage(text,currentChat._id,user?.id,setTextMessage)}} bgColor={'transparent'}  _hover={{ bgColor: '#4a4a4a' }} rounded={'5'} cursor={'pointer'}  >< VscSend color='#9d9d9d' fontSize={'25px'} /></Button>

                        {/* <InputGroup mx={'20px'} px={'15px'}  >
                            <InputEmoji  className='input_Send_Msg' fontSize={'15px'} color={'#9d9d9d'} placeholder='Type a message' borderRadius={'10px'} padding={'3px'} px={'10px'}  />
                            
                            <InputRightElement  top={'4.5px'} _hover={{ bgColor: '#4a4a4a' }} rounded={'5'} cursor={'pointer'}>

                            </InputRightElement>
                        </InputGroup> */}
                    </Box>
                </GridItem>

            </Grid >) : (
            <Grid height={'100%'} templateRows={'auto'}>
                <GridItem >
                    <Box gap={0} height={'100%'} color={'#484848'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                        <Icon padding={'10px'} boxSize={28} as={HiOutlineChatBubbleLeftRight} />
                        <Text fontSize={'30px'} padding={'2px'}>Lets Chat</Text>
                    </Box>
                </GridItem>
            </Grid>)

    )
}

export default ChatBox
