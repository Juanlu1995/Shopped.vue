import { ApiEndpoint } from '@/api/ApiEndpoint';
import customerApi from '@/api/endpoints/customer';

const api = new ApiEndpoint(import.meta.env.VITE_API_BASE || '');

api.add(customerApi);

export default api;
