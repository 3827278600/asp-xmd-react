import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { message } from 'antd';
import { crypto } from './crypto';

// 接口返回数据的类型
interface IBaseResponse<T = unknown> {
  code: number;
  data: T;
  message: string;
}

// 创建请求实例
const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 加密请求数据
    if (config.method?.toLowerCase() !== 'get' && config.data) {
      config.data = {
        encrypted: crypto.encrypt(config.data),
      };
    }

    // 加密URL参数
    if (config.params) {
      config.params = {
        encrypted: crypto.encrypt(config.params),
      };
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// 响应拦截器
instance.interceptors.response.use(
  <T>(response: AxiosResponse<IBaseResponse<T>>) => {
    const { code, data, message: msg } = response.data;

    if (code === 200) {
      return data;
    }

    message.error(msg || '请求失败');
    return Promise.reject(new Error(msg || '请求失败'));
  },
  (error) => {
    const { response } = error;
    const { status, data } = response || {};

    switch (status) {
      case 401:
        message.error('登录已过期，请重新登录');
        localStorage.removeItem('token');
        window.location.href = '/login';
        break;
      case 403:
        message.error('没有权限');
        break;
      case 404:
        message.error('请求的资源不存在');
        break;
      case 500:
        message.error('服务器错误');
        break;
      default:
        message.error(data?.message || '请求失败');
    }

    return Promise.reject(error);
  },
);

/**
 * GET请求
 * @param url - 请求地址
 * @param config - 请求配置
 */
export function get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
  return instance.get<IBaseResponse<T>, T>(url, config);
}

/**
 * POST请求
 * @param url - 请求地址
 * @param data - 请求数据
 * @param config - 请求配置
 */
export function post<T = unknown, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<T> {
  return instance.post<IBaseResponse<T>, T>(url, data, config);
}

/**
 * PUT请求
 * @param url - 请求地址
 * @param data - 请求数据
 * @param config - 请求配置
 */
export function put<T = unknown, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<T> {
  return instance.put<IBaseResponse<T>, T>(url, data, config);
}

/**
 * DELETE请求
 * @param url - 请求地址
 * @param config - 请求配置
 */
export function del<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
  return instance.delete<IBaseResponse<T>, T>(url, config);
}

export { instance as default };
