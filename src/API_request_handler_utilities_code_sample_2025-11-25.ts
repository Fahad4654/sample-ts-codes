// api-utils.ts

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface APIResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

async function apiRequest<T>(
  url: string,
  method: HTTPMethod = 'GET',
  body: any = null,
  headers: Record<string, string> = {}
): Promise<APIResponse<T>> {
  try {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      return { data: null, error: data.message || `HTTP error! Status: ${response.status}`, status: response.status };
    }

    return { data: data as T, error: null, status: response.status };

  } catch (error: any) {
    return { data: null, error: error.message || 'An unexpected error occurred', status: 500 };
  }
}

async function get<T>(url: string, headers?: Record<string, string>): Promise<APIResponse<T>> {
  return apiRequest<T>(url, 'GET', null, headers);
}

async function post<T>(url: string, body: any, headers?: Record<string, string>): Promise<APIResponse<T>> {
  return apiRequest<T>(url, 'POST', body, headers);
}

async function put<T>(url: string, body: any, headers?: Record<string, string>): Promise<APIResponse<T>> {
  return apiRequest<T>(url, 'PUT', body, headers);
}

async function del<T>(url: string, headers?: Record<string, string>): Promise<APIResponse<T>> {
  return apiRequest<T>(url, 'DELETE', null, headers);
}

async function patch<T>(url: string, body: any, headers?: Record<string, string>): Promise<APIResponse<T>> {
    return apiRequest<T>(url, 'PATCH', body, headers);
}

export { apiRequest, get, post, put, del as delete, patch, APIResponse, HTTPMethod };