import { Box, Button, Flex, FormControl, FormLabel, Input, Text } from '@chakra-ui/react'
import React from 'react'

const Login = () => {
    return (
        <Box fontFamily={'Raleway'} color={'white'} bg={'#282828'} >
            <Flex height={'91.8vh'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                <Text my={'10px'} p={'10px'} fontSize={'27px'} as={'h1'}>
                    Login
                </Text>
                <Box w={{base:'200px',md:'400px',lg:'400px'}} padding={'15px'} >
                    <form>
                        <FormControl p={'2px'} my={'2px'}>
                            <FormLabel>Email</FormLabel>
                            <Input name='email' type='email'></Input>
                        </FormControl>
                        <FormControl p={'2px'} my={'2px'}>
                            <FormLabel>Password</FormLabel>
                            <Input name='password' type='password'></Input>
                        </FormControl>
                    </form>
                    <Flex justifyContent={'center'}>
                        <Button  m={'10px'}>Login</Button>
                    </Flex>

                </Box>
            </Flex>
        </Box>
    )
}

export default Login
