export interface AccountForTransfer {
  debitedAccount: string;
  creditedAccount: string;
}

export interface AccountsIdsForTransfer {
  debitedAccountId: number;
  creditedAccountId: number;
}

export interface TransferOutput extends AccountsIdsForTransfer {
  value: number;
}

export interface TransferInput extends AccountForTransfer {
  value: number;
}

export interface Transaction extends TransferOutput {
  id?: number;
  createdAt: Date;
}
