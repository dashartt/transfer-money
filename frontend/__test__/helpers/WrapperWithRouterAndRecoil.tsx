import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const WrapperWithRouterAndRecoil = ({ children }: Props) => {
  return (
    <BrowserRouter>
      <RecoilRoot>{children}</RecoilRoot>
    </BrowserRouter>
  );
};

export default WrapperWithRouterAndRecoil;
