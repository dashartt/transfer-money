import {
  Button,
  chakra,
  Heading,
  HStack,
  Icon,
  Input,
  Stack,
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
    <chakra.form onSubmit={onSubmit}>
      <Stack direction={{ base: 'column', md: 'row' }} justifyContent="space-between">
        <HStack>
          <Icon as={RiMoneyDollarCircleLine} />
          <Heading as="h1">Transfer</Heading>
        </HStack>

        <HStack>
          <Input
            placeholder="username"
            w="10em"
            ref={ownerCreditAccountRef}
            borderColor="main.green"
            _focus={{ borderColor: 'white ' }}
          />
          <Input
            placeholder="value"
            w="7em"
            ref={amountRef}
            borderColor="main.green"
            _focus={{ borderColor: 'white ' }}
            type="number"
          />
          <Button
            _active={{ backgroundColor: 'main.gren' }}
            _hover={{ backgroundColor: 'main.gren', color: 'black' }}
            alignSelf="flex-end"
            color="white"
            bgColor="main.green"
            type="submit"
          >
            Send
          </Button>
        </HStack>
      </Stack>
    </chakra.form>
  );
}
