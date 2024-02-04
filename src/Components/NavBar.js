import { Box, Button, Container, Flex, Spacer, Text } from '@chakra-ui/react'
import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
    return (
        <Flex w={'100%'} fontFamily={'Raleway'} color={'white'} bg={'#202528'} alignItems={'center'} p={'10px'} px={'20px'} gap={5}>
            <Box ml={'10px'} px={'5px'}>
                <Text fontSize={'25px'} >
                    VAARता
                </Text>
            </Box>
            <Spacer />
            <Box display={{base:'none',sm:'block',md:'block',lg:'block'}} color={'orange'}>
                Logged In as Aditya
            </Box>
            <Spacer />
            <Box display={'flex'} flexDirection={'row'} mr={'10px'} px={'5px'}>
               <NavLink to={'login'}><Button size={{base:'sm',md:'md'}} colorScheme='blue' px={{base:'3px',md:'10px'}} mx={'3px'}>Login</Button></NavLink> 
               <NavLink to={'register'}><Button size={{base:'sm',md:'md'}} colorScheme='blue' p={{base:'3px',md:'10px'}} mx={'3px'}>Register</Button></NavLink> 
            </Box>
        </Flex>

    )
}

export default NavBar
