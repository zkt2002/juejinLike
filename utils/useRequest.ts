import { Ref } from 'vue';
import { hash } from 'ohash';

interface RequestOptions {
  url: string;
  method?: 'GET' | 'POST';
  params?: Record<string, any>;
  query?: Record<string, any>;
  body?: Record<string, any>;
}

interface FetchOptions extends Omit<RequestOptions, 'url'> {
  headers?: Record<string, any>;
  key?: string;
  baseURL?: string;
  transform?: any;
}

function transform(res: any) {
  const { errCode, message, data } = res;
  return errCode === 0 ? data : new Error(message);
}

export async function useRequest<T>(options: RequestOptions): Promise<{ data: Ref<T>; error: Ref<Error | null> }> {
  const runtimeConfig = useRuntimeConfig();
  const baseURL = runtimeConfig.public.baseURL;
  const { url, method = 'GET', params, query, body } = options;
  const key = hash(JSON.stringify(options) + url);
  const fetchOptions: FetchOptions = { method, params, query, body, key, baseURL, transform };
  if (method === 'POST') {
    fetchOptions.headers = { 'content-type': 'Application/json' };
  }
  const { data, error } = await useFetch(url, fetchOptions);
  return { data, error };
}
