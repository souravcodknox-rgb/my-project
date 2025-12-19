import axios, {
    AxiosError,
  } from 'axios';
  import type { AxiosResponse,InternalAxiosRequestConfig } from 'axios';

  import { _getToken } from "../utils/index"
  import { toast } from 'react-toastify';
  
  interface IPostProps {
    url: string;
    payload?: object;
  }
  interface MyErrorResponse {
    message: string;
    // other fields
  }
  
  const apiResource = () => {  
    let hasShownNetworkError = false;
  
    const service = axios.create({
      baseURL: `${import.meta.env.DEVELOP_BASE_URL}/`,
      withCredentials: false,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",     
      },
    });
  
    service.interceptors.request.use((config: InternalAxiosRequestConfig) => { 
      const token = _getToken();
  
      if (!token) return config;
      config.headers!['access-token'] = token;
      return config;
    });
  
    service.interceptors.response.use(
      (response: AxiosResponse) => {
        return response?.data;
      },
      (error: AxiosError) => {
        const errorData = error?.response?.data as MyErrorResponse;
        if (error?.response === undefined) {
          if (!hasShownNetworkError) {
            hasShownNetworkError = true;
            toast('No internet connection', {
              type: 'error',
              position: 'top-right',
              autoClose: 5000,
              theme: 'colored',
            });
            setTimeout(() => (hasShownNetworkError = false), 5000);
          }
          return false;
        } else {
          const status = error?.response?.status;
  
          if (status === 404) {
            // return error
            // showToast("Resource not found", "error");
            // toast('Resource not found', {
            //   position: 'top-right',
            //   autoClose: 5000,
            // });
          }
           if (status === 440) {
            localStorage.clear();
            localStorage.clear();
            window.location.href = '/';
          }
          if (status === 400 || status === 401) {  
            toast(`${errorData.message}`, {
              type: 'error',
              position: 'top-right',
              autoClose: 5000,
              theme: 'colored',
            });
          } else if (status === 440) {
            localStorage.clear();
            localStorage.clear();
            window.location.href = '/';
          }
  
          return errorData
        }
      },
    );
  
    return {
      get: async (url: string) => {
        try {
          const data = service.get(url);
          const resolvedData = await Promise.resolve(data);
          return resolvedData;
        } catch (error) {
          return Promise.reject(error);
        }
      },
  
      post: async ({ url, payload }: IPostProps) => {
        try {
          const data = service.post(url, payload);
          const resolvedData = await Promise.resolve(data);
          return resolvedData;
        } catch (error) {
          return Promise.reject(error);
        }
      },
  
      patch: async ({ url, payload }: IPostProps) => {
        try {
          const data = service.patch(url, payload);
          const resolvedData = await Promise.resolve(data);
          return resolvedData;
        } catch (error) {
          return Promise.reject(error);
        }
      },
  
      delete: async ({ url, payload }: IPostProps) => {
        try {
          const data = service.delete(url, payload);
          const resolvedData = await Promise.resolve(data);
          return resolvedData;
        } catch (error) {
          return Promise.reject(error);
        }
      },
  
      put: async ({ url, payload }: IPostProps) => {
        try {
          const data = service.put(url, payload);
          const resolvedData = await Promise.resolve(data);
          return resolvedData;
        } catch (error) {
          return Promise.reject(error);
        }
      },
    };
  };
  
  export const apiService = apiResource();
  