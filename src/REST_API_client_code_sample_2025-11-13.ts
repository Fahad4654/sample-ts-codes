interface APIResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

async function apiClient<T>(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', body?: any): Promise<APIResponse<T>> {
  try {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      return { data: null, error: data.message || 'Request failed', status: response.status };
    }

    return { data: data as T, error: null, status: response.status };
  } catch (error: any) {
    return { data: null, error: error.message || 'An unexpected error occurred', status: 500 };
  }
}

export async function get<T>(url: string): Promise<APIResponse<T>> {
  return apiClient<T>(url, 'GET');
}

export async function post<T>(url: string, body: any): Promise<APIResponse<T>> {
  return apiClient<T>(url, 'POST', body);
}

export async function put<T>(url: string, body: any): Promise<APIResponse<T>> {
  return apiClient<T>(url, 'PUT', body);
}

export async function del<T>(url: string): Promise<APIResponse<T>> {
  return apiClient<T>(url, 'DELETE');
}

// Example usage (not part of the library, just demonstrates usage):
interface User {
  id: number;
  name: string;
  email: string;
}

async function fetchUser(id: number): Promise<APIResponse<User>> {
  return get<User>(`/api/users/${id}`);
}