import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Input,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { FormEventHandler, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { authFormState } from '../../recoil/atoms';
import { requestAuth } from '../../services/api';
import toastConfig from '../../utils/toastConfig';
import FormatMessageApi from '../messages/FormatMessageApi';

type Props = {
  authType: string;
};

export default function AuthForm({ authType }: Props) {
  const [_tabIndex, setTabIndex] = useRecoilState(authFormState);
  const toast = useToast();
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    requestAuth(
      {
        username: usernameRef.current?.value,
        password: passwordRef.current?.value,
      },
      authType,
    ).then((data) => {
      console.log(data);

      if (data?.message?.includes('created')) {
        setTabIndex(1);
        toast({
          ...toastConfig,
          description: data?.message,
        });
      } else if (data?.message?.includes('authenticated')) {
        localStorage.setItem(
          'user',
          JSON.stringify({
            username: usernameRef.current?.value,
            balance: data.balance,
            token: data.token,
          }),
        );
        navigate('/');
      } else {
        toast({
          ...toastConfig,
          description: <FormatMessageApi messageList={data.errors} />,
        });
      }
    });
  };

  return (
    <chakra.form onSubmit={onSubmit} padding="1.5em">
      <VStack gap="1.3em">
        <FormControl>
          <FormLabel color="white">Username</FormLabel>
          <Input
            autoComplete="off"
            ref={usernameRef}
            _focus={{ bg: '#e2e8f0', color: 'black' }}
            name="username"
            color="white"
            type="text"
          />
        </FormControl>

        <FormControl>
          <FormLabel color="white">Password</FormLabel>
          <Input
            ref={passwordRef}
            name="password"
            _focus={{ bg: '#e2e8f0', color: 'black' }}
            color="white"
            type="password"
          />
        </FormControl>

        <Button
          type="submit"
          _active={{ bg: 'main.lightGreen' }}
          _hover={{ bg: 'main.lightGreen' }}
          backgroundColor="main.green"
          width="full"
        >
          {authType == 'register' ? 'Register' : 'Enter'}
        </Button>
      </VStack>
    </chakra.form>
  );
}
