import { Box, Button, Flex, FormControl, FormLabel, Input, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext.js'
const Register = () => {
    const {  registerUserInfo,updateRegisterInfo,isLoadingRegister, registerUser  } = useContext(AuthContext)
    
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
                            <Input name='name' type='text' value={registerUserInfo.name} onChange={(e)=>{
                                updateRegisterInfo({...registerUserInfo,[e.target.name]:e.target.value})
                            }}></Input>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input name='email' type='email' value={registerUserInfo.email} onChange={(e)=>{
                                updateRegisterInfo({...registerUserInfo,[e.target.name]:e.target.value})
                            }}></Input>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <Input name='password' type='password' value={registerUserInfo.password} onChange={(e)=>{
                                updateRegisterInfo({...registerUserInfo,[e.target.name]:e.target.value})
                            }}></Input>
                        </FormControl>
                    </form>
                    <Flex justifyContent={'center'}>
                        <Button onClick={registerUser} m={'10px'}>{
                        isLoadingRegister?"Creating Accoutnt":"Register"
                        }</Button>
                    </Flex>
                    
                </Box>
            </Flex>
        </Box>
    )
}

export default Register
