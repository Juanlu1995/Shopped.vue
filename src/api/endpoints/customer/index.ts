import { ApiEndpoint } from '@/api/endpoints/ApiEndpoint';

const customerApi = new ApiEndpoint('customer');

const paths = [
  { name: 'id', subPath: '/:id' },
  { name: 'name', subPath: '/name/:name' },
];

paths.forEach((path) => {
  customerApi.addSubPath(path.name, path.subPath);
});

export default customerApi;
