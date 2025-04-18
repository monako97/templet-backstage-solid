import { extend } from '@moneko/request';
export { request } from '@moneko/request';

extend({
  interceptor: {
    // 请求拦截器
    async request(option) {
      // 请求前进行修改
      if (option.url.startsWith('/login')) {
        Object.assign(option, {
          headers: {
            ...option.headers,
            'token-one': 'abcdefg',
          },
        });
      }
      return option;
    },
    // 响应拦截器
    async response(resp) {
      return resp;
    },
  },
  // 非 http 开头的请求加上前缀 /api
  prefixUrl: '/api',
});
