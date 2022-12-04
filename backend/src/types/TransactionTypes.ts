export interface AccountForTransfer {
  debitedAccount: string;
  creditedAccount: string;
}

export interface AccountsIdsForTransfer {
  debitedAccountId?: number;
  creditedAccountId: number;
}

export interface TransferOutput extends AccountsIdsForTransfer {
  value: number;
}

export interface TransferInput extends AccountForTransfer {
  value: number;
}

export interface TransactionInput extends TransferOutput {
  id?: number;
  createdAt: Date;
}

export interface TransactionOutput extends AccountForTransfer {
  inCome: number;
  outCome: number;
  datetime: string | Date;
}
