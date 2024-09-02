import type { Customer } from '@/types';

export interface SearchCustomerSocketServiceReturn {
  connect(): void;
  disconnect(): void;
  query(name: string): void;
  listen(callback: (customer: Customer[]) => void): void;
  reconnect(callback: () => void): void;
}

export interface ServerToClientEvents {
  foundedCustomers: (customers: Customer[]) => void;
}

export interface ClientToServerEvents {
  searchCustomers: (customer: string) => void;
}
