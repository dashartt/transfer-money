import { createContext, useState } from 'react';

export type BalanceContextValue = {
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
};

type Props = {
  children: React.ReactNode[] | React.ReactNode;
};

export const BalanceContext = createContext<BalanceContextValue | null>(null);

const BalanceProvider = ({ children }: Props) => {
  const [balance, setBalance] = useState(0.0);

  return (
    <BalanceContext.Provider
      value={{
        balance,
        setBalance,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};

export default BalanceProvider;
