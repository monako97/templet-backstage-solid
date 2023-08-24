import { type LocaleConfig } from '@app/locales';

const zhCN: LocaleConfig = {
  language: 'zh_CN',
  title: '简体中文',
  translation: {
    root: '首页',
    home: '主页',
    user: '用户',
    dynamicRoute: '动态路由',
    'user/:id': '用户信息',
    'user/:id/:state': '动态路由/用户信息/状态',
    about: '关于',
    other: '其它',
    management: '管理',
    hitokoto: '一言',
    refetch: '重新请求',
    outlet: '路由页面视图',
  },
};

export default zhCN;
