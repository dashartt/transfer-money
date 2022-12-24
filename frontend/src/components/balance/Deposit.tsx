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
        color="gray.200"
        bg="gray.800"
        _active={{ backgroundColor: 'gray.500' }}
        _hover={{ backgroundColor: 'gray.500' }}
        onClick={onOpen}
      >
        Deposit
      </Button>
      <Modal isOpen={isOpen} onClose={onCloseDepositModal}>
        <ModalOverlay />
        <ModalContent bg="gray.200">
          <ModalHeader>Deposit</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <chakra.form onSubmit={onSubmit} paddingBottom="2em">
              <FormControl>
                <HStack justifyContent="flex-end">
                  <FormLabel fontWeight="bold" w="full" fontSize="lg">
                    Amount value
                  </FormLabel>
                  <Input
                    autoComplete="off"
                    ref={depositRef}
                    bg="gray.800"
                    color="white"
                    name="username"
                    type="number"
                  />
                  <Button
                    px="2em"
                    _active={{ backgroundColor: 'gray.500' }}
                    _hover={{ backgroundColor: 'gray.500' }}
                    bgColor="gray.800"
                    type="submit"
                    color="white"
                  >
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
