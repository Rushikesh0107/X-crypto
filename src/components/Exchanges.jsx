import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { server } from '../index'
import { Container, HStack, Heading, VStack, Image, Text } from '@chakra-ui/react';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';


const Exchanges = () => {

    const [exchanges, setExchanges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchExhanges = async () => {
            try {
                const {data} = await axios.get(`${server}/exchanges`);
                setExchanges(data);
                console.log(data);
                setLoading(false);
                }
            catch (error) {
                setError(true);
                setLoading(false);
            }
        }

        fetchExhanges();
    },[])

    if(error){
        return <ErrorComponent message={"Error while fetching exchanges"}/>
    }

  return (
    <Container maxW={"container.xl"}>
        
        {loading ? <Loader /> : (<>
            <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
                {exchanges.map((i) => (
                    <ExchangeCard
                    key={i.id} 
                    name={i.name} 
                    image={i.image} 
                    rank={i.trust_score_rank}
                    url={i.url}
                    />
                )
            )}
            </HStack>
        </>)}
    </Container>
  )
}

const ExchangeCard = ({name, image, rank, url}) => (
    <a href={url} target={"blank"}>
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
                {rank}
            </Heading>

            <Text noOfLines={1}>
                {name}
            </Text>
        </VStack>
    </a>
)


export default Exchanges