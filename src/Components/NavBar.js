import { Box, Button, Flex, Spacer, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext.js'

const NavBar = () => {
    const{user}=useContext(AuthContext)
    return (
        <Flex w={'100%'} fontFamily={'Raleway'} color={'white'} bg={'#202528'} alignItems={'center'} p={'10px'} px={'20px'} gap={5}>
            <Box ml={'10px'} px={'5px'}>
                <Text fontSize={'25px'} >
                    VAARता
                </Text>
            </Box>
            <Spacer />
            <Box display={{ base: 'none', sm: 'block', md: 'block', lg: 'block' }} color={'orange'}>
                {user&&<Text>
                    {`Logged In as ${user.name}`}
                </Text>}
            </Box>
            <Spacer />
            <Box display={'flex'} flexDirection={'row'} mr={'10px'} px={'5px'}>
                <NavLink to={'login'}><Button size={{ base: 'sm', md: 'md' }} colorScheme='blue' px={{ base: '3px', md: '10px' }} mx={'3px'}>Login</Button></NavLink>
                <NavLink to={'register'}><Button size={{ base: 'sm', md: 'md' }} colorScheme='blue' p={{ base: '3px', md: '10px' }} mx={'3px'}>Register</Button></NavLink>
            </Box>
        </Flex>

    )
}

export default NavBar
