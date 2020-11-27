import Config from 'react-native-config';

export interface getBalanceResponse {
  message_code: number;
  message: string;
  balance: number;
}

export default async function getBalance(token: string) {
  const response = await fetch(`${Config.baseUrl}/api/v1/balance`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json().then((data: getBalanceResponse) => data);
}
