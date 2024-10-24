import { describe, expect, test } from 'vitest';
import { ApiEndpoint } from '@/api/endpoints/ApiEndpoint';
import { URL } from 'node:url';

describe('ApiEndpoint', () => {
  test('Should return a correct endpoint without path params', async () => {
    const endpoint = '/myEndpoint';
    const apiEndpoint = new ApiEndpoint(endpoint);
    const expectedUrl = new URL(endpoint, import.meta.env.VITE_API_PATH);

    expect(apiEndpoint.buildUrl()).toBe(expectedUrl.toString());
  });
  test('Should return a correct endpoint with sub paths without path params', async () => {
    const endpoint = '/myEndpoint';
    const subPath = '/foo';
    const subPathEndPoint = new ApiEndpoint('/foo');
    const apiEndpoint = new ApiEndpoint(endpoint);
    apiEndpoint.add(subPathEndPoint);
    const expectedUrl = new URL(
      `${endpoint}${subPath}`,
      import.meta.env.VITE_API_PATH,
    );

    expect(subPathEndPoint.buildUrl()).toBe(expectedUrl.toString());
  });
  test('Should add subPath to endpoint without path params', async () => {
    const endpoint = '/myEndpoint';
    const subPath = '/foo';

    const apiEndpoint = new ApiEndpoint(endpoint);

    apiEndpoint.addSubPath(subPath);

    const expectedUrl = new URL(
      `${endpoint}${subPath}`,
      import.meta.env.VITE_API_PATH,
    );

    expect(apiEndpoint.foo.buildUrl()).toBe(expectedUrl.toString());
  });
  test('Should add subPath to endpoint with path params', async () => {
    const endpoint = '/myEndpoint';
    const subPath = '/:foo';

    const apiEndpoint = new ApiEndpoint(endpoint);

    apiEndpoint.addSubPath('foo', subPath);

    const expectedValue = 'bar';
    const expectedUrl = new URL(
      `${endpoint}/${expectedValue}`,
      import.meta.env.VITE_API_PATH,
    );

    expect(apiEndpoint.foo.buildUrl({ foo: expectedValue })).toBe(
      expectedUrl.toString(),
    );
  });
  test('Should throw and error when subPath have params not passed', async () => {
    const endpoint = '/myEndpoint';
    const subPath = '/:foo';

    const apiEndpoint = new ApiEndpoint(endpoint);

    apiEndpoint.addSubPath('foo', subPath);

    expect(() => apiEndpoint.foo.buildUrl()).toThrowError(/:foo/);
  });
});
