import React, { useContext } from 'react'
import { ChatContext } from '../Context/ChatContext.js'
import { Box, Grid, GridItem, Text } from '@chakra-ui/react'
import UserChats from '../Components/UserChats.js'
import {AuthContext} from '../Context/AuthContext.js'
const Chat = () => {
  const { userChats ,isUserChatLoading } = useContext(ChatContext)
  const { user} = useContext(AuthContext)
  return (
    <Grid height='100%'
      templateRows='1fr'
      templateColumns='1fr 3fr'>
      <GridItem borderRight='1px solid black' bg='#3c3c3c'>
        <Box>
          {
            userChats?.length == 0 ? (<Text>No Chats to Display</Text>) :
              (
                <Box my={'5px'} display={'flex'} flexDirection={'column'} padding={'6px'}>
                  {
                    userChats?.map((chat, index) => (
                      <UserChats key={index} chat={chat} user={user}/>
                    ))
                  }
                </Box>
              )
          }
        </Box>
      </GridItem>
      <GridItem bg='#3c3c3c'>
        <Grid height='100%' templateRows='1fr 10fr'>
          <GridItem borderBottom='1px solid black'></GridItem>
          <GridItem bgImage=''></GridItem>
        </Grid>
      </GridItem>
    </Grid>
  )
}

export default Chat
