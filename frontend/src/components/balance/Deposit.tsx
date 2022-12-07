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

import { balanceState, transactionHistoryState } from '../../recoil/atoms';
import { requestDepositAmount, requestTransactionHistory } from '../../services/api';
import toastConfig from '../../utils/toastConfig';
import FormatMessageApi from '../messages/FormatMessageApi';

function Deposit() {
  const [, setTransactions] = useRecoilState(transactionHistoryState);
  const [, setBalance] = useRecoilState(balanceState);
  const toast = useToast();
  const { isOpen, onOpen, onClose: onCloseDepositModal } = useDisclosure();
  const depositRef = useRef<HTMLInputElement>(null);

  const onTransferUpdateHistory = () =>
    requestTransactionHistory().then((data) => setTransactions(data));

  const onSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    const depositAmount = Number(depositRef.current?.value);

    requestDepositAmount({
      value: depositAmount,
    }).then((data) => {
      if (data?.message?.includes('Successful transfer')) {
        setBalance((prev) => prev + depositAmount);
        onCloseDepositModal();
        onTransferUpdateHistory();

        toast({
          ...toastConfig,
          description: data?.message,
        });
      } else {
        toast({
          ...toastConfig,
          description: data?.message || FormatMessageApi({ messageList: data.errors }),
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
      <Modal isOpen={isOpen} onClose={onCloseDepositModal}>
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
