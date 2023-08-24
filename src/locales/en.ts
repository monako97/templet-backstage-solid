import { type LocaleConfig } from '@app/locales';

const en: LocaleConfig = {
  language: 'en_US',
  title: '英文',
  translation: {
    root: 'Root',
    home: 'Home',
    user: 'User',
    dynamicRoute: 'Dynamic Route',
    'user/:id': 'User info',
    'user/:id/:state': 'Dynamic Route/User info/State',
    about: 'About',
    other: 'Other',
    management: 'Management',
    hitokoto: 'Hitokoto',
    refetch: 'Refetch',
    outlet: 'Router Page View',
  },
};

export default en;
