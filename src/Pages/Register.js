import { Box, Button, Flex, FormControl, FormLabel, Icon, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext.js'
import { BiSolidShow, BiSolidHide } from "react-icons/bi";

const Register = () => {
    const { registerUserInfo, updateRegisterInfo, isLoadingRegister, registerUser } = useContext(AuthContext)
    const [showPass, setShowPass] = useState(false)
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
                            <Input name='name' type='text'  onChange={(e) => {
                                updateRegisterInfo({ ...registerUserInfo, [e.target.name]: e.target.value })
                            }}></Input>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input name='email' type='email'  onChange={(e) => {
                                updateRegisterInfo({ ...registerUserInfo, [e.target.name]: e.target.value })
                            }}></Input>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input name='password' type={showPass ? 'text' : 'password'}  onChange={(e) => {
                                    updateRegisterInfo({ ...registerUserInfo, [e.target.name]: e.target.value })
                                }} />
                                <InputRightElement><Icon onClick={() => {
                                    setShowPass(!showPass)
                                }} as={showPass ? BiSolidHide : BiSolidShow} fontSize={'25px'} /></InputRightElement>
                            </InputGroup>
                        </FormControl>
                    </form>
                    <Flex justifyContent={'center'}>
                        <Button onClick={registerUser} m={'10px'}>{
                            isLoadingRegister ? "Creating Accoutnt" : "Register"
                        }</Button>
                    </Flex>

                </Box>
            </Flex>
        </Box>
    )
}

export default Register
