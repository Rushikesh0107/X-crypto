import React, {useState, useEffect} from 'react'
import Loader from './Loader';
import axios from 'axios';
import { server } from '../index';
import { 
  Container, 
  Box, 
  Radio, 
  RadioGroup, 
  VStack, 
  Text, 
  HStack, 
  Image, 
  Stat, 
  StatLabel, 
  StatNumber, 
  StatHelpText, 
  StatArrow, 
  Badge, 
  Progress,
  Button 
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import ErrorComponent from './ErrorComponent';
import  Chart  from './Chart';

const CoinDeatils = () => {

  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);
  const params = useParams();

  const btns = ["24h", "7d", "30d", "60d", "200d", "1y", "max"];

  const switchChartStats = (key) => {
    
    switch (key) {
      case "24h":
        setDays("24h");
        break;

      case "7d":
        setDays("7d");
        break;

      case "30d":
        setDays("30d");
        break;
      
      case "60d":
        setDays("60d");
        break;
      
      case "200d":
        setDays("200d");
        break;

      case "1y":
        setDays("1y");
        break;

      case "max":
        setDays("max");
        break;

      default: 
        setDays("24h");
        break;
    }
  }

  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  useEffect(() => {
    const fetchCoin = async () => {
        try {
            const {data} = await axios.get(`${server}/coins/${params.id}`);

            const {data: chartData} = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);

            setChartArray(chartData.prices);
            console.log(chartData);

            setCoin(data);
            setLoading(false);
            }
        catch (error) {
            setError(true);
            setLoading(false);
        }
    }

    fetchCoin();
  }, [params.id, currency, days]);

  if(error){
    return <ErrorComponent message={"Error while fetching coins"}/>
  }

  return (
    <Container maxW={"conatiner.xl"}>
      {loading ? <Loader /> : (<>
      <Box width={"full"} borderWidth={1}>
        <Chart  
        currency={currencySymbol}
        arr={chartArray}
        days={days}
        transition={"all 0.3s ease-in-out"}
        />
      </Box>

      <HStack 
      p="4" 
      justifyContent={"center"}
      overflowX={"auto"}
      wrap={"wrap"}
      >
        {
          btns.map((i) => (
            <Button 
            key={i} 
            onClick={() => switchChartStats(i)}
            bgColor={i == days ? "blackAlpha.900" : "blackAlpha.600"}
            color={"white"}
            cursor={"pointer"}
            _hover={{bgColor: "blackAlpha.800"}}
            >
              {i}
            </Button>
          ))
        }
      </HStack>


      <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
                <HStack spacing={"4"} >
                    <Radio value={"inr"}>INR</Radio>
                    <Radio value={"usd"}>USD</Radio>
                    <Radio value={"eur"}>EUR</Radio>
                </HStack>
        </RadioGroup>

        <VStack spacing={"4"} p="16" alignItems={"flex-start"}>

          <Text fontSize={"small"} alignSelf="center" opacity={"0.7"}>
            Last Updated on {Date(coin.market_data.last_updated).split("GMT")[0]}
          </Text>

          <Image 
          src={coin.image.large} 
          w={"16"}
          h={"16"}
          objectFit={"contain"}
          />

          <Stat>
            <StatLabel>
              {coin.name}
            </StatLabel>
            <StatNumber>
              {currencySymbol}{coin.market_data.current_price[currency]}
            </StatNumber>

            <StatHelpText>
              <StatArrow type={coin.market_data.price_change_percentage_24h.toFixed(2) > 0 ? 'increase' : 'decrease'} />
                {coin.market_data.price_change_percentage_24h.toFixed(2)}%
            </StatHelpText>
          </Stat>

          <Badge 
          fontSize={"2xl"} 
          bgColor={"blackAlpha.800"}
          color={"white"}
          >
            {`#${coin.market_cap_rank}`}
          </Badge>

          <CustomBar high={`${currencySymbol}${coin.market_data.high_24h[currency]}`} low={`${currencySymbol}${coin.market_data.low_24h[currency]}`} coin = {coin}>

          </CustomBar>

          <Box
          w={"full"}
          p="4"
          >

            <Item 
            title={"Market Supply"}
            value={coin.market_data.max_supply} 
            />

            <Item 
            title={"Circulationg Supply"}
            value={coin.market_data.circulating_supply}
            />

            <Item 
            title={"Market Cap"}
            value={coin.market_data.market_cap[currency]} 
            />

            <Item 
            title={"All Time Low"}
            value={`${currencySymbol}${coin.market_data.atl[currency]}`} 
            />

            <Item 
            title={"All time High"}
            value={`${currencySymbol}${coin.market_data.ath[currency]}`} 
            />

          </Box>

        </VStack>
      </>)}
    </Container>
  )
}

const Item = ({title, value}) => {
  return (
    <HStack
    w={"full"}
    justifyContent={"space-between"}
    my={"4"}
    >
      <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>{title}</Text>
      <Text>{value}</Text>
    </HStack>
  )
}


const CustomBar = ({high, low, coin}) => {
  return (
    <VStack w={"full"}>
      <Progress 
      value={50} 
      colorScheme="teal" 
      w={"full"}
      />

      <HStack
      justifyContent={"space-between"}
      w={"full"}
      >
        <Badge children={low} colorScheme={"red"} />
        <Text children={"24h Range"} />
        <Badge children={high} colorScheme={"green"} />
      </HStack>
    </VStack>
  )
}

export default CoinDeatils