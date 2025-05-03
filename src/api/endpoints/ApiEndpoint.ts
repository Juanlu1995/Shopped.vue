type Endpoint = { [key: string]: ApiEndpoint };
const PATH_PARAMS_REGEX = /(\/:(\w*))/g;

export class ApiEndpoint {
  private endpoint: string;
  private parent: ApiEndpoint | null;
  private subPaths: Endpoint;
  private baseUri: string;

  // Index signature to support dynamic property access
  // [key: string]: any;

  constructor(endpoint: string, parent: ApiEndpoint | null = null) {
    const normalizedEndpoint =
      endpoint[0] === '/' ? endpoint.slice(1) : endpoint;

    this.endpoint = normalizedEndpoint;
    this.parent = parent;
    this.subPaths = {};
    this.baseUri = '';

    return new Proxy(this, {
      get: (target: ApiEndpoint, prop: string): ApiEndpoint => {
        if (typeof prop === 'string' && prop in target.subPaths) {
          return target.subPaths[prop];
        }
        if (prop in target) {
          return (target as any)[prop];
        }
        const newEndpoint = new ApiEndpoint(prop.toString(), target);
        target.subPaths[prop.toString()] = newEndpoint;
        return newEndpoint;
      },
    });
  }

  set setBaseUri(base: string) {
    this.baseUri = base;
  }

  addSubPath(name: string, subPath?: string): void {
    this.subPaths[name] = new ApiEndpoint(subPath ?? name, this);
  }

  add(endpoint: ApiEndpoint, name = '') {
    endpoint.parent = this;
    this.subPaths[name || endpoint.endpoint] = endpoint;
  }

  toUrl(): string {
    if (this.parent) {
      return `${this.parent.toUrl()}/${this.endpoint}`;
    }

    return this.endpoint ? `/${this.endpoint}` : '';
  }

  buildUrl(pathParams: { [key: string]: string } = {}): string {
    let url = this.toUrl();

    const foundedParams = url.match(PATH_PARAMS_REGEX);

    if (
      foundedParams &&
      Array.from(foundedParams).length !== Object.entries(pathParams).length
    ) {
      throw new Error(
        `Invalid params for url:\nurl: ${this.toUrl()}\nparams: ${pathParams}`,
      );
    }

    if (foundedParams) {
      for (const param of foundedParams) {
        url = url.replace(
          param.toString().substring(1),
          pathParams[param.toString().substring(2)],
        );
      }
    }

    return new URL(
      `/api${url}`,
      `${window.location.protocol}//${window.location.host}`,
      //(import.meta.env.VITE_VITE_API_PATH || window.location.host),
    ).toString();
  }
}
