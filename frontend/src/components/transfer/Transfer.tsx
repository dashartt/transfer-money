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
import { FormEventHandler, useContext, useRef } from 'react';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { useRecoilState } from 'recoil';

import { balanceState } from '../../recoil/atoms';
import { requestTransfer } from '../../services/api';
import { AuthedUserDTO } from '../../types/RequestData';
import toastConfig from '../../utils/toastConfig';
import FormatMessageApi from '../messages/FormatMessageApi';

export default function Transfer() {
  const [_balance, setBalance] = useRecoilState(balanceState);

  const toast = useToast();
  const ownerCreditAccountRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const authedUser = JSON.parse(localStorage.getItem('user') || '') as AuthedUserDTO;

    requestTransfer({
      debitedAccount: authedUser.username,
      creditedAccount: ownerCreditAccountRef.current?.value || '',
      value: Number(amountRef.current?.value) || 0.01,
    }).then((data) => {
      if (data?.message === 'Successful transfer') {
        toast({
          ...toastConfig,
          description: data?.message,
        });

        const balanceAfterTransfer =
          authedUser.balance - Number(amountRef.current?.value);

        setBalance(balanceAfterTransfer);

        localStorage.setItem(
          'user',
          JSON.stringify({
            ...authedUser,
            balance: balanceAfterTransfer,
          }),
        );
      } else {
        toast({
          ...toastConfig,
          description: <FormatMessageApi messageList={data.errors} />,
        });
      }
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
            ref={ownerCreditAccountRef}
            borderColor="main.green"
            _focus={{ borderColor: 'white ' }}
          />
          <Input
            placeholder="value"
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
