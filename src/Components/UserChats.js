import { Avatar, AvatarBadge, Badge, Box, Flex, Grid, Text, Toast, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { baseUrl, getRequest } from '../Utilis/services'
import { useFetchRecipientUser } from '../Hooks/useFetchRecipientUser'

const UserChats = ({ user, chat }) => {
    const { recipientUser } = useFetchRecipientUser(chat, user)

    return (
        <Box as='button' _hover={{ bgColor: '#4a4a4a' }} fontFamily={'Raleway'} borderRadius={'8px'} color={'white'} padding={'10px'} px={'15px'}>
            <Flex gap={'1'} position={'relative'} direction={'row'}>
                <Box py='2px' px='6px'>
                    <Avatar >
                    <AvatarBadge boxSize='0.8em' bg='green.500' />

                    </Avatar>
                </Box>
                <Flex gap={'3'} width={'100%'} justifyContent={'space-between'} mx='10px'>

                    <Box textAlign={'start'}>
                        <Box fontSize={'18px'} fontWeight={'600'}>{recipientUser?.name}</Box>
                        <Box fontSize={'14px'} fontWeight={'200'}>Message</Box>
                    </Box>

                    <Box>
                        <Box fontSize={'11px'} fontWeight={'200'}>Today</Box>

                    </Box>

                </Flex>
                <Badge display={'flex'} justifyContent={'center'} alignItems={'center'} borderRadius={'100%'} width={'20px'} height={'20px'} position={'absolute'} bottom={'2px'} right={'2px'} ml='1' fontSize='14px' colorScheme="whatsapp">
                    2
                </Badge>
            </Flex>
        </Box>
    )
}

export default UserChats
