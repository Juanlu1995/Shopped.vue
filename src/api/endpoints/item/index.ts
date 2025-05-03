import { ApiEndpoint } from '@/api/endpoints/ApiEndpoint';

const itemApi = new ApiEndpoint('iten');

itemApi.addSubPath('id', '/:id');
itemApi.addSubPath('name', '/name/:name');

export default itemApi;
