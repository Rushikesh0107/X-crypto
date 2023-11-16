import { Alert, AlertIcon, HStack } from '@chakra-ui/react'
import React from 'react'

const ErrorComponent = ({message}) => {
  return (
    <HStack>
        <Alert 
      status="error"
      position={"fixed"}
      bottom={"4"}
      left={"50%"}
      transform={"translateX(-50%)"}
      w={"container.lg"}
      >
        <AlertIcon />
        {
          message
        }
      </Alert>
    </HStack>
  )
}

export default ErrorComponent