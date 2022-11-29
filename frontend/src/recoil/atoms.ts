import { atom } from 'recoil';

export const balanceState = atom({
  key: 'balance',
  default: 0.0,
});

export const authFormState = atom({
  key: 'tabIndex',
  default: 0,
});
