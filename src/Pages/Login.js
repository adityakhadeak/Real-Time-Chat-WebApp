import { Box, Button, Flex, FormControl, FormLabel, Icon, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { BiSolidShow, BiSolidHide} from "react-icons/bi";
import { AuthContext } from '../Context/AuthContext.js';

const Login = () => {
    const {loginUser,isLoginLoading,updateLoginInfo,loginUserInfo}=useContext(AuthContext)
    const [showPass, setshowPass] = useState(false)
    return (
        <Box height={'100%'} fontFamily={'Raleway'} color={'white'} bg={'#282828'} >
            <Flex height={'100%'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                <Text my={'10px'} p={'10px'} fontSize={'27px'} as={'h1'}>
                    Login
                </Text>
                <Box w={{ base: '200px', md: '400px', lg: '400px' }} padding={'15px'} >
                    <form>
                        <FormControl p={'2px'} my={'2px'}>
                            <FormLabel>Email</FormLabel>
                            <Input name='email' type='email' onChange={(e)=>{
                                updateLoginInfo({...loginUserInfo,[e.target.name]:e.target.value})
                            }} />
                        </FormControl>
                        <FormControl p={'2px'} my={'2px'}>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input name='password' type={showPass?'text':'password'}  onChange={(e)=>{
                                updateLoginInfo({...loginUserInfo,[e.target.name]:e.target.value})
                            }} />
                                <InputRightElement>
                                    <Icon cursor={'pointer'} onClick={()=>{
                                        setshowPass(!showPass)
                                    }} fontSize={'25px'} as={showPass?BiSolidHide:BiSolidShow} />
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                    </form>
                    <Flex justifyContent={'center'}>
                        <Button onClick={loginUser} m={'10px'}>{isLoginLoading?"Logging In":"Login"}</Button>
                    </Flex>

                </Box>
            </Flex>
        </Box>
    )
}

export default Login
