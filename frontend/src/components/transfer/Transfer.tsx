import {
  Box,
  Button,
  chakra,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { FormEventHandler, useRef } from 'react';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { useRecoilState } from 'recoil';

import { balanceState, transactionHistoryState } from '../../recoil/atoms';
import { requestTransactionHistory, requestTransfer } from '../../services/api';
import { AuthedUserDTO } from '../../types/RequestData';
import LocalStorage from '../../utils/LocalStorage';
import toastConfig from '../../utils/toastConfig';
import FormatMessageApi from '../messages/FormatMessageApi';

export default function Transfer() {
  const [, setBalance] = useRecoilState(balanceState);
  const [, setTransactions] = useRecoilState(transactionHistoryState);

  const toast = useToast();
  const ownerCreditAccountRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);

  const onTransferUpdateHistory = () =>
    requestTransactionHistory().then((data) => setTransactions(data));

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const authedUser = JSON.parse(localStorage.getItem('user') || '') as AuthedUserDTO;
    const amount = Number(amountRef.current?.value) || 0.01;

    requestTransfer({
      debitedAccount: authedUser.username,
      creditedAccount: ownerCreditAccountRef.current?.value || '',
      value: amount,
    }).then((data) => {
      if (data?.message === 'Successful transfer') {
        toast({
          ...toastConfig,
          description: data?.message,
        });

        setBalance((prev) => {
          const currentBalance = prev - amount;

          LocalStorage.set('user', {
            ...authedUser,
            balance: currentBalance,
          });

          return currentBalance;
        });

        onTransferUpdateHistory();
      } else {
        toast({
          ...toastConfig,
          description: <FormatMessageApi messageList={data.errors} />,
        });
      }

      ownerCreditAccountRef.current!.value = '';
      amountRef.current!.value = '';
    });
  };

  return (
    <Box
      bg="gray.200"
      mt={{ base: '15em', lg: '0em' }}
      padding="2em"
      maxW="fit-content"
      border="1px solid black"
    >
      <Stack direction={{ base: 'column', lg: 'row' }} justifyContent="space-between">
        <HStack alignItems="center" mr="2em">
          <Icon as={RiMoneyDollarCircleLine} />
          <Text fontSize="4xl">Transfer</Text>
        </HStack>

        <chakra.form onSubmit={onSubmit}>
          <Stack
            direction={{ base: 'column', lg: 'row' }}
            alignItems="center"
            w="fit-content"
          >
            <FormControl>
              <FormLabel w="max-content">Who will you transfer to?</FormLabel>
              <Input
                placeholder="username"
                w="10em"
                ref={ownerCreditAccountRef}
                bg="gray.800"
                color="gray.200"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Transfer amount</FormLabel>
              <Input
                placeholder="value"
                w="7em"
                ref={amountRef}
                bg="gray.800"
                color="gray.200"
                type="number"
              />
            </FormControl>
            <Button
              _active={{ backgroundColor: 'gray.500' }}
              _hover={{ backgroundColor: 'gray.500' }}
              color="gray.200"
              alignSelf={{ base: 'flex-start', lg: 'flex-end' }}
              px="2em"
              bgColor="gray.800"
              type="submit"
            >
              Send
            </Button>
          </Stack>
        </chakra.form>
      </Stack>
    </Box>
  );
}
