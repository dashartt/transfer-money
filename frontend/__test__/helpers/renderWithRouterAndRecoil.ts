import { render } from '@testing-library/react';

import WrapperWithRouterAndRecoil from './WrapperWithRouterAndRecoil';

const renderWithRouterAndRecoil = (component: JSX.Element, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return {
    ...render(component, { wrapper: WrapperWithRouterAndRecoil }),
  };
};

export default renderWithRouterAndRecoil;
