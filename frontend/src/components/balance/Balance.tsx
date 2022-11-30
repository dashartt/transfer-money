import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { balanceState } from '../../recoil/atoms';
import { AuthedUserDTO } from '../../types/RequestData';
import LocalStorage from '../../utils/LocalStorage';

export default function Balance() {
  const [balance, setBalance] = useRecoilState(balanceState);

  useEffect(() => {
    const userData = LocalStorage.get('user') as AuthedUserDTO;
    setBalance(userData?.balance ?? 0);
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
