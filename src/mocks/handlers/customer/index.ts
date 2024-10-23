import { http, HttpResponse } from 'msw';
import type { Customer } from '@/types';
import { buildUrl } from '@/mocks/utils/buildUrl';

const date = new Date().toISOString();

const MOCK_CUSTOMERS: Customer[] = [
  {
    id: 0,
    created_at: date,
    name: `Customer 0`,
    deleted_at: null,
    updated_at: date,
  },
  {
    id: 1,
    created_at: date,
    name: `Customer 1`,
    deleted_at: null,
    updated_at: date,
  },
  {
    id: 2,
    created_at: date,
    name: `Customer 2`,
    deleted_at: date,
    updated_at: date,
  },
];

const handlers = [
  http.all(buildUrl('/customer/*'), ({ request, params }) => {
    console.log(request.url, { params });
  }),
  http.get<{ id: string }>(buildUrl('/customer/:id'), ({ params }) => {
    const customer: Customer | undefined = MOCK_CUSTOMERS[params.id];

    if (!customer) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(customer);
  }),
  http.get<{ name: string }>(buildUrl('/customer/name/:name'), ({ params }) => {
    const customers: Customer[] = MOCK_CUSTOMERS.filter((customer) =>
      customer.name.toLowerCase().includes(params.name.toLowerCase()),
    );

    if (!customers.length) return new HttpResponse(null, { status: 404 });

    return HttpResponse.json(customers);
  }),
  http.get(buildUrl('/customer'), () => {
    HttpResponse.json(MOCK_CUSTOMERS);
  }),
];

export default handlers;
