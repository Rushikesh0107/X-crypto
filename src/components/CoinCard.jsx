import React from 'react'
import { VStack, Image, Heading, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const CoinCard = ({id, image,name, symbol, price, currencySymbol = "₹"}) => (
    <Link to={`/coin/${id}`}>
        <VStack 
        w={"52"}
        shadow={"lg"}
        p={"8"}
        borderRadius={"lg"}
        transition={"all 0.3s ease-in-out"}
        m={"4"}
        css={{
            "&:hover": {
                transform: "scale(1.05)",
                shadow: "xl",
            }
        }}
        >
            <Image
            src={image}
            w={"10"}
            h={"10"}
            objectFit={"contain"}
            alt={"Exchange"}
            />

            <Heading size={"md"} noOfLines={1}>
                {name}
            </Heading>

            <Text size={"md"} noOfLines={1}>
                {symbol}
            </Text> 

            <Text noOfLines={1}>
                {price ? `${currencySymbol} ${price}` : "NA"}
            </Text>
        </VStack>
    </Link>
)

export default CoinCard