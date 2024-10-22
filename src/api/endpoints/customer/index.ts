import { ApiEndpoint } from '@/api/endpoints/ApiEndpoint';

const customerApi = new ApiEndpoint('customer');

customerApi.addSubPath('id', '/:id');
customerApi.addSubPath('name', '/name/:name');

export default customerApi;
