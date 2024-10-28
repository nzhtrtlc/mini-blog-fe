const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

type RequestConfig = RequestInit & {
  data?: object;
};

async function request<T>(
  endpoint: string,
  { data, ...customConfig }: { data?: object } & RequestConfig = {}
): Promise<T> {
  const config: RequestConfig = {
    method: data ? "POST" : "GET",
    headers: {
      "Content-Type": "application/json",
    },
    ...customConfig,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`API Error: ${error.message}`);
    }
    throw new Error("API Error occurred");
  }
}

export const api = {
  get: <T>(endpoint: string, config = {}) =>
    request<T>(endpoint, { ...config, method: "GET" }),

  post: <T>(endpoint: string, data: object) =>
    request<T>(endpoint, { data, method: "POST" }),

  put: <T>(endpoint: string, data: object) =>
    request<T>(endpoint, { data, method: "PUT" }),

  delete: <T>(endpoint: string) => request<T>(endpoint, { method: "DELETE" }),
};
