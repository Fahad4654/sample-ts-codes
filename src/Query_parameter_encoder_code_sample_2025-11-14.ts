function encodeQueryParameters(params: Record<string, any>): string {
  const encodedParams: string[] = [];

  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      const value = params[key];

      if (value === null || value === undefined) {
        continue;
      }

      if (Array.isArray(value)) {
        value.forEach(item => {
          encodedParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(item)}`);
        });
      } else {
        encodedParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
      }
    }
  }

  return encodedParams.length > 0 ? `?${encodedParams.join('&')}` : '';
}

// Example usage
const queryParams = {
  search: 'typescript',
  page: 1,
  tags: ['javascript', 'programming'],
  sort: null,
  empty: undefined
};

const encodedQueryString = encodeQueryParameters(queryParams);
console.log(encodedQueryString);