import api from '@/api/endpoints';
import type {
  ClientToServerEvents,
  SearchCustomerSocketServiceReturn,
  ServerToClientEvents,
} from '@/api/services/customer/types';
import type { Customer } from '@/types';
import { io, Socket } from 'socket.io-client';
let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

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

export const searchCustomerSocketService: SearchCustomerSocketServiceReturn = {
  connect: () => {
    socket = io(import.meta.env.VITE_API_PATH || window.location.host);
  },
  disconnect: () => {
    socket?.disconnect();
  },
  reconnect: (callback) => {
    socket &&
      socket?.io.open((err) => {
        if (err) {
          throw new Error('Error reconnecting!');
        }
        callback();
      });
  },
  query: (name: string) => {
    try {
      if (!socket?.active) {
        return searchCustomerSocketService.reconnect(() =>
          searchCustomerSocketService.query(name),
        );
      }
      return socket?.emit('searchCustomers', name);
    } catch (e) {
      console.error(e);
    }
  },
  listen: (callback) => {
    try {
      if (!socket?.active) {
        return searchCustomerSocketService.reconnect(() =>
          searchCustomerSocketService.listen(callback),
        );
      }
      return socket.on('foundedCustomers', (customers) => {
        return callback(customers);
      });
    } catch (e) {
      console.error(e);
    }
  },
  stopListen: () => {
    try {
      if (socket?.active) {
        return socket.removeAllListeners('foundedCustomers');
      }
    } catch (e) {
      console.error(e);
    }
  },
};
