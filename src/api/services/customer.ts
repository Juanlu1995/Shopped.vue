import api from '@/api/endpoints';
import type { Customer } from '@/types';

export const createCustomerService = async (
  name: string,
): Promise<Customer> => {
  const response: Response = await fetch(api.customer.toUrl(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });
  if (response.status >= 200 && response.status < 300 && response.ok) {
    return (await response.json()) as Customer;
  }
  throw new Error(`There was an error with status: ${response.status}`);
};


export const searchCustomerSocketService =(name:string) => {
  
}