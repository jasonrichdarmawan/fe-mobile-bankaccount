import Config from 'react-native-config';

export interface getTransactionsPathVariable {
  Start: string;
  End: string;
  token?: string;
}

export interface TransactionModel {
  Date: string;
  Source: string;
  Destination: string;
  Destination_Type: number;
  transaction_Value: number;
  Ending_Balance: number;
}

export interface getTransactionsResponseBody {
  message_code: number;
  message: string;
  Opening_Balance: number;
  transactions: TransactionModel[];
}

export default async function getTransactions({
  Start,
  End,
  token,
}: getTransactionsPathVariable) {
  const response = await fetch(
    `${Config.baseUrl}/api/v1/history/${Start}/${End}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return await response
    .json()
    .then((data: getTransactionsResponseBody) => data);
}
