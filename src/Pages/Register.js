import { Box, Button, Flex, FormControl, FormLabel, Input, Text, useToast } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext.js'
const Register = () => {
    const { setRegisterUser, registerUser } = useContext(AuthContext)
    const toast = useToast()
    
    const updateRegisterInfo=(e)=>{
        const info=({...registerUser,[e.target.name]:e.target.value})
        setRegisterUser(info)
        console.log(registerUser)
    }
    return (
        <Box fontFamily={'Raleway'} color={'white'} bg={'#282828'} >
            <Flex height={'91.8vh'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                <Text my={'10px'} p={'10px'} fontSize={'27px'} as={'h1'}>
                    Register
                </Text>
                <Box w={{ base: '200px', md: '400px', lg: '400px' }} padding={'15px'} >
                    <form>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input name='name' type='text' onChange={(e)=>updateRegisterInfo(e)}></Input>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input name='email' type='email' onChange={(e)=>updateRegisterInfo(e)}></Input>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <Input name='password' type='password' onChange={(e)=>updateRegisterInfo(e)}></Input>
                        </FormControl>
                    </form>
                    <Flex justifyContent={'center'}>
                        <Button onClick={() =>
                            toast({
                                title: 'Account created.',
                                description: "We've created your account for you.",
                                status: 'success',
                                duration: 9000,
                                isClosable: true,
                            })
                        } m={'10px'}>Register</Button>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}

export default Register
