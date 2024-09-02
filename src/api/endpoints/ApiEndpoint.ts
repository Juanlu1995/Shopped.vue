type Endpoint = { [key: string]: ApiEndpoint };

export class ApiEndpoint {
  private endpoint: string;
  private parent: ApiEndpoint | null;
  private subpaths: Endpoint;

  // Index signature to support dynamic property access
  [key: string]: any;

  constructor(endpoint: string, parent: ApiEndpoint | null = null) {
    const normalizedEndpoint =
      endpoint[0] === '/' ? endpoint.slice(1) : endpoint;

    this.endpoint = normalizedEndpoint;
    this.parent = parent;
    this.subpaths = {};
    this.baseUri = '';

    return new Proxy(this, {
      get: (target: ApiEndpoint, prop: string) => {
        if (typeof prop === 'string' && prop in target.subpaths) {
          return target.subpaths[prop];
        }
        if (prop in target) {
          return (target as any)[prop];
        }
        const newEndpoint = new ApiEndpoint(prop.toString(), target);
        target.subpaths[prop.toString()] = newEndpoint;
        return newEndpoint;
      },
    });
  }
  set setBaseUri(base: string) {
    this.baseUri = base;
  }

  setSubPath(name: string, subpath?: string): void {
    this.subpaths[name] = new ApiEndpoint(subpath ?? name, this);
  }

  add(endpoint: ApiEndpoint, name = '') {
    endpoint.parent = this;
    this.subpaths[name || endpoint.endpoint] = endpoint;
  }

  toUrl(): string {
    if (this.parent) {
      return `${this.parent.toUrl()}/${this.endpoint}`;
    }

    return new URL(
      this.endpoint ? `/${this.endpoint}` : '',
      import.meta.env.VITE_API_PATH || window.location.host,
    ).toString().slice(0, -1);
  }
}
