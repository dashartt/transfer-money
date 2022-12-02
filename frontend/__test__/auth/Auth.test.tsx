import { RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import Auth from '../../src/pages/Auth';
import renderWithRouterAndRecoil from '../helpers/renderWithRouterAndRecoil';

describe('Auth page test', () => {
  let document_: RenderResult;
  let inputUsername: HTMLElement;
  let inputPassword: HTMLElement;

  beforeEach(() => {
    document_ = renderWithRouterAndRecoil(<Auth />);
    inputUsername = document_.getByLabelText('Username');
    inputPassword = document_.getByLabelText('Password');
  });

  it('Registration form', () => {
    userEvent.type(inputUsername, 'dashartz');
    userEvent.type(inputPassword, '12345678');

    const registerButton = document_.getByRole('button', {
      name: 'Register',
    });
    userEvent.click(registerButton);
  });

  it('Login form', () => {
    const loginTabForm = document_.getByRole('tab', {
      name: 'Log in',
    });
    userEvent.click(loginTabForm);

    userEvent.type(inputUsername, 'dashartz');
    userEvent.type(inputPassword, '12345678');

    const loginButton = document_.getByRole('button', {
      name: 'Enter',
    });
    userEvent.click(loginButton);
  });
});
