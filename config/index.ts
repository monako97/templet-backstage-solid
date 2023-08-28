import type { ConfigType } from 'PackageNameByCore';

const conf: Partial<ConfigType> = {
  importOnDemand: {
    '@moneko/common': {
      transform: 'lib/${member}',
    },
    lodash: {
      transform: '${member}',
    },
  },
  proxy: [
    {
      context: ['/api/'],
      target: 'http://localhost:8007/',
      changeOrigin: true,
      pathRewrite: { '^/api/': '/' },
      secure: false,
    },
  ],
};

export default conf;
