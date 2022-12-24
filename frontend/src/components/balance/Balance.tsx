import { Box, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { balanceState } from '../../recoil/atoms';
import { AuthedUserDTO } from '../../types/RequestData';
import formatValue from '../../utils/formatValue';
import LocalStorage from '../../utils/LocalStorage';
import Deposit from './Deposit';

export default function Balance() {
  const [balance, setBalance] = useRecoilState(balanceState);

  useEffect(() => {
    const userData = LocalStorage.get('user') as AuthedUserDTO;
    setBalance(userData?.balance ?? 0);
  }, []);

  return (
    <HStack justifyContent="space-between" w="fit-content">
      <HStack w="full">
        <Text fontSize="1.4rem" fontWeight="bold">
          Balance: {`R$${formatValue(balance)}`}
        </Text>
      </HStack>
      <Deposit />
    </HStack>
  );
}
