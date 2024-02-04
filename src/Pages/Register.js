import { Box, Button, Flex, FormControl, FormLabel, Input, Text, useToast } from '@chakra-ui/react'
import React from 'react'

const Register = () => {
    const toast=useToast()
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
                            <Input name='name' type='text'></Input>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input name='email' type='email'></Input>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <Input name='password' type='password'></Input>
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
