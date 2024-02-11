import { Badge, Box, Button, Icon, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal, Text } from '@chakra-ui/react'
import { IoIosNotifications } from "react-icons/io";
import moment from 'moment';
import React, { useContext } from 'react'
import { ChatContext } from '../Context/ChatContext.js';
import { getUnreadNotifications } from '../Utilis/getUnreadNotifications.js';

const Notifications = () => {
    const { notifications, allUsers } = useContext(ChatContext)
    const unReadNotifications = getUnreadNotifications(notifications)
    const modifiedNotifications = notifications?.map((note) => {
        const sender = allUsers.find((user) => user._id === note.senderId)
        console.log(sender)
        return {
            ...note,
            senderName: sender?.name
        }
    })

    console.log("Un", unReadNotifications)
    console.log("Mo", modifiedNotifications)
    return (
        <Box display={'flex'} alignItems={'center'}>
            <Popover>
                <PopoverTrigger>
                    <Button position={'relative'} _hover={{ bgColor: "transparent" }} bgColor={'transparent'}>
                        <Icon color={'wheat'} fontSize={'28px'} as={IoIosNotifications} />
                        {unReadNotifications?.length === 0 ? null :
                            <Badge display={'flex'} justifyContent={'center'} alignItems={'center'} borderRadius={'100%'} width={'20px'} height={'20px'} position={'absolute'} bottom={'2px'} right={'2px'} ml='1' fontSize='14px' bgColor={'#1daa61'} >
                                {unReadNotifications.length}
                            </Badge>}
                    </Button>
                </PopoverTrigger>
                <Portal>
                    <PopoverContent p={'10px'} border={'none'} bgColor={'#292929'}>
                        <PopoverArrow bgColor={'transparent'} />
                        <PopoverHeader border={'none'} fontSize={'18px'} fontWeight={'600'}>
                            <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                                <Text>Notifications</Text>
                                <Button w={'125px'} _hover={{bgColor:"#4a4a4a"}} p={'10px'} color={'white'} height={'25px'} bgColor={'#4a4a4a'}>Mark all as read</Button>

                            </Box>
                        </PopoverHeader>
                        <PopoverBody height={'400px'} border={'none'}>
                            <Box overflow={"scroll"} className='' height={'100%'} display={'flex'} flexDirection={'column'} gap={3}>
                                {modifiedNotifications.length === 0 ?
                                    <Box textAlign={'center'}>
                                        <Text>No notifications to display</Text>
                                    </Box> :
                                    modifiedNotifications?.map((note, index) => (
                                        <Box key={index} position={'relative'} my p={'5px'} height={'60px'} bg={"#4a4a4a"}>
                                            <Text><Text as='span' fontWeight={700}>{note.senderName}</Text> sent you a meaasage</Text>
                                            <Text fontSize={'12px'}>{moment(note.date).calendar()}</Text>
                                        </Box>
                                    ))
                                }
                            </Box>
                        </PopoverBody>
                     
                    </PopoverContent>
                </Portal>
            </Popover>
        </Box>
    )
}

export default Notifications
