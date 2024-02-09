import { Avatar, Box, Grid, GridItem, HStack, Icon, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { ChatContext } from '../Context/ChatContext.js'
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { useFetchRecipientUser } from '../Hooks/useFetchRecipientUser';
import { AuthContext } from '../Context/AuthContext';

const ChatBox = () => {
    const { currentChat } = useContext(ChatContext)
    const { user } = useContext(AuthContext)
    const { recipientUser } = useFetchRecipientUser(currentChat, user)
    return (

        currentChat ? (
            <Grid fontFamily={'Raleway'} height='100%' templateRows={'1fr 9fr'} >
                <GridItem borderBottom='0.3px solid black'>
                    <HStack px={'10px'} spacing={'10px'}>
                        <Box padding={'5px'}><Avatar size='md' /></Box>
                        <Box padding={'10px'} fontWeight={600}>{recipientUser?.name}</Box>
                    </HStack>
                </GridItem>
                <GridItem bgImage=''>
                    
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
