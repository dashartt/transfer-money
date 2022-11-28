import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';

import { BalanceContext, BalanceContextValue } from '../../contexts/BalanceProvider';
import { AuthedUserDTO } from '../../types/RequestData';

export default function Balance() {
  const { balance, setBalance } = useContext(BalanceContext) as BalanceContextValue;

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '') as AuthedUserDTO;

    setBalance(userData.balance);
  }, []);

  return (
    <Box>
      <VStack justifyContent="space-between">
        <Heading alignSelf={{ base: 'flex-start', lg: 'baseline' }} as="h1">
          Balance
        </Heading>
        <Text fontSize="1.4rem" alignSelf="flex-start" fontWeight="bold">
          {`R$${balance}`}
        </Text>
      </VStack>
    </Box>
  );
}
