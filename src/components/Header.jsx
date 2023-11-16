import { HStack, Button, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <HStack 
    p={"4"} 
    shadow={"base"} 
    bgColor={"blackAlpha.900"}
    justifyContent={"space-between"}
    >

        <Text
        color={"white"}
        fontWeight={"bold"}
        fontSize={"2xl"}
        >
          X-crypto
        </Text>

        <HStack>

        <Button 
        variant={"unstyled"} 
        color={"white"}
        fontWeight={"thin"}
        cursor={"pointer"}
        >
            <Link to="/">Home</Link>
        </Button>

        <Button 
        variant={"unstyled"} 
        color={"white"}
        fontWeight={"thin"}
        cursor={"pointer"}
        >
            <Link to="/exchanges">Exchanges</Link>
        </Button>

        <Button 
        variant={"unstyled"} 
        color={"white"}
        fontWeight={"thin"}
        cursor={"pointer"}
        >
            <Link to="/coins">Coins</Link>
        </Button>

        </HStack>
    </HStack>
  )
}

export default Header