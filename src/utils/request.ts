/**
 * Custom Error interface to handle API-specific error responses
 */
export interface ApiError extends Error {
  status?: number;
  errors?: Record<string, any>;
}

/**
 * Request configuration interface
 */
interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  params?: Record<string, string | number | boolean | undefined>;
  body?: any;
  headers?: HeadersInit;
}

const BASE_URL = 'https://api.example.com';

/**
 * Core request utility using Fetch API
 * @param url - Endpoint path (e.g., '/articles')
 * @param options - Method, params, body, and headers
 * @template T - The expected shape of the JSON response
 */
const request = async <T>(
  url: string,
  { method = 'GET', params, body, headers: customHeaders }: RequestOptions = {},
): Promise<T> => {
  // 1. Construct URL with Search Parameters
  let fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) searchParams.append(key, String(value));
    });
    const queryString = searchParams.toString();
    if (queryString) fullUrl += `?${queryString}`;
  }

  // 2. Setup Headers
  const headers: HeadersInit = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // TODO: Add Authorization token from storage (e.g., MMKV or AsyncStorage)
    // 'Authorization': `Bearer ${token}`,
    ...customHeaders,
  };

  const config: RequestInit = {
    method,
    headers,
    ...(body && { body: JSON.stringify(body) }),
  };

  try {
    const response = await fetch(fullUrl, config);

    // 3. Handle Non-2xx Responses
    if (!response.ok) {
      // Handle global error cases (e.g., 401 Unauthorized)
      if (response.status === 401) {
        // Redirect to login or refresh token logic
      }

      const errorData = await response.json().catch(() => ({}));
      const error = new Error(errorData.message || 'API_ERROR') as ApiError;
      error.status = response.status;
      error.errors = errorData.errors;
      throw error;
    }

    // 4. Return Typed Data
    return (await response.json()) as T;
  } catch (error) {
    // Log error to monitoring services (e.g., Sentry)
    throw error;
  }
};

/**
 * GET Request
 * @example get<User[]>('/users', { role: 'admin' })
 */
export const get = <T>(url: string, params?: RequestOptions['params']) =>
  request<T>(url, { method: 'GET', params });

/**
 * POST Request
 * @example post<User>('/users', { name: 'John' })
 */
export const post = <T>(url: string, body?: any) => request<T>(url, { method: 'POST', body });

/**
 * PUT Request
 */
export const put = <T>(url: string, body?: any) => request<T>(url, { method: 'PUT', body });

/**
 * PATCH Request
 */
export const patch = <T>(url: string, body?: any) => request<T>(url, { method: 'PATCH', body });

/**
 * DELETE Request
 */
export const del = <T>(url: string) => request<T>(url, { method: 'DELETE' });

export default request;
