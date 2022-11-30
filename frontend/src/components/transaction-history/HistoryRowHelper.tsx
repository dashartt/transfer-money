import { Td } from '@chakra-ui/react';

import { AuthedUserDTO } from '../../types/RequestData';
import { TransactionDTO } from '../../types/Transaction';

type Props = {
  transaction: TransactionDTO;
};

function HistoryRowHelper({ transaction }: Props) {
  const user = JSON.parse(localStorage.getItem('user') || '') as AuthedUserDTO;

  const isDebit = user.username === transaction.debitedAccount;
  const DebitAmount = <Td color="red.500">{`- R$${transaction.inCome}`}</Td>;
  const CreditAmount = <Td color="green.500">{`+ R$${transaction.inCome}`}</Td>;

  const DebitDescription = <Td>Pix to {transaction.creditedAccount}</Td>;
  const CreditDescription = <Td>Pix from {transaction.debitedAccount}</Td>;

  return (
    <>
      <Td>{transaction.date}</Td>
      {isDebit && (
        <>
          {DebitDescription}
          {DebitAmount}
        </>
      )}

      {!isDebit && (
        <>
          {CreditDescription}
          {CreditAmount}
        </>
      )}
      <Td>R${transaction.outCome}</Td>
    </>
  );
}

export default HistoryRowHelper;
