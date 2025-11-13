interface QueryParams {
  [key: string]: string | number | boolean | string[] | number[] | boolean[] | null | undefined;
}

class QueryParamManager {
  private baseUrl: string;

  constructor(baseUrl: string = window.location.origin + window.location.pathname) {
    this.baseUrl = baseUrl;
  }

  public getParams(): QueryParams {
    const params: QueryParams = {};
    const searchParams = new URLSearchParams(window.location.search);
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    return params;
  }

  public updateParams(newParams: QueryParams): void {
    const url = new URL(this.baseUrl);
    const searchParams = new URLSearchParams();

    const currentParams = this.getParams();
    const mergedParams = { ...currentParams, ...newParams };

    for (const key in mergedParams) {
      const value = mergedParams[key];
      if (value !== null && value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach(item => searchParams.append(key, String(item)));
        } else {
          searchParams.set(key, String(value));
        }
      } else {
          searchParams.delete(key);
      }
    }

    url.search = searchParams.toString();
    window.history.pushState({}, '', url.toString());
  }

  public removeParam(key: string): void {
     const params = this.getParams();
     delete params[key];
     this.updateParams(params);
  }

  public getParam(key:string): string | number | boolean | string[] | number[] | boolean[] | undefined {
    const params = this.getParams();
    return params[key];
  }
}