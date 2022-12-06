import { Td } from '@chakra-ui/react';

import { AuthedUserDTO } from '../../types/RequestData';
import { TransactionDTO } from '../../types/Transaction';
import formatValue from '../../utils/formatValue';

type Props = {
  transaction: TransactionDTO;
};

function HistoryRowHelper({ transaction }: Props) {
  const user = JSON.parse(localStorage.getItem('user') || '') as AuthedUserDTO;
  const { creditedAccount, debitedAccount, inCome, outCome, date } = transaction;

  const isDebit = user.username === debitedAccount;
  const setColor = isDebit ? 'red.500' : 'green.500';
  const setCurrencySign = isDebit ? '- R$' : '+ R$';

  const isDeposit = !debitedAccount;

  const DepositDescription = <Td>Deposit to {creditedAccount}</Td>;
  const DebitDescription = <Td>Pix to {creditedAccount}</Td>;
  const CreditDescription = <Td>Pix from {debitedAccount}</Td>;

  return (
    <>
      <Td>{date}</Td>

      {isDebit && DebitDescription}
      {!isDebit && (isDeposit ? DepositDescription : CreditDescription)}

      <Td color={setColor}>{` ${setCurrencySign}${formatValue(inCome)}`}</Td>
      <Td>R${formatValue(outCome)}</Td>
    </>
  );
}

export default HistoryRowHelper;
