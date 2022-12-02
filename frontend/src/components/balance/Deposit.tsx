import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { FormEventHandler, useRef } from 'react';
import { useRecoilState } from 'recoil';

import { balanceState } from '../../recoil/atoms';
import { requestDepositAmount } from '../../services/api';
import toastConfig from '../../utils/toastConfig';

function Deposit() {
  const [_balance, setBalance] = useRecoilState(balanceState);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const depositRef = useRef<HTMLInputElement>(null);

  const onSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    requestDepositAmount({
      amount: Number(depositRef.current?.value),
    }).then((data) => {
      if (data.message.includes('deposited')) {
        toast({
          ...toastConfig,
          description: data?.message,
        });
        console.log(data.balance);

        setBalance(data.balance);
      } else {
        toast({
          ...toastConfig,
          description: data?.message,
        });
      }
    });
  };

  return (
    <>
      <Button
        color="white"
        bg="main.green"
        _active={{ backgroundColor: 'main.gren' }}
        _hover={{ backgroundColor: 'main.gren', color: 'black' }}
        onClick={onOpen}
      >
        Deposit
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deposit</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <chakra.form onSubmit={onSubmit} paddingBottom="2em">
              <FormControl>
                <HStack>
                  <FormLabel>Amount</FormLabel>
                  <Input
                    autoComplete="off"
                    ref={depositRef}
                    _focus={{ bg: '#e2e8f0', color: 'black' }}
                    name="username"
                    color="white"
                    type="text"
                  />
                  <Button type="submit" colorScheme="green">
                    Confirm
                  </Button>
                </HStack>
              </FormControl>
            </chakra.form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Deposit;
