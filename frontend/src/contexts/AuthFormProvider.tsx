import { createContext, useState } from 'react';

export type AuthFormContextValue = {
  tabIndex: number;
  setTabIndex: React.Dispatch<React.SetStateAction<number>>;
};

type Props = {
  children: React.ReactNode[] | React.ReactNode;
};

export const AuthFormContext = createContext<AuthFormContextValue | null>(null);

const AuthFormProvider = ({ children }: Props) => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <AuthFormContext.Provider
      value={{
        tabIndex,
        setTabIndex,
      }}
    >
      {children}
    </AuthFormContext.Provider>
  );
};

export default AuthFormProvider;
