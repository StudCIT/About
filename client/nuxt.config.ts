import { Configuration } from '@nuxt/types';
import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin';

import sass from 'sass';

import { ConfigService } from './utils/config/config.service';
const configService = new ConfigService();

const config: Configuration = {
  /*
  ** Server options
  */
  server: {
    port: configService.getSetting('APP_PORT'),
    timing: configService.getSetting('APP_TIMG'),
  },
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: `%s - ${configService.getSetting('npm_package_name')}`,
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui',
      },
      {
        hid: 'description',
        name: 'description',
        content: configService.getSetting('APP_DESC'),
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
  },
  css: ['~/assets/style/app.sass'],
  /*
  ** Customize the progress bar color
  */
  loading: 'components/loading.vue',
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/mixins',
    '~/plugins/vuetify',
    { src: '~/plugins/swiper', ssr: false },
  ],
  /*
  ** Modules to load before mounting the App
  */
  buildModules: [
    '@nuxt/typescript-build',
    'nuxt-i18n',
    // 'nuxt-validate',
  ],
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      sass: {
        implementation: sass,
        indentedSyntax: true,
      },
    },
  },
  typescript: {
    typeCheck: false,
    ignoreNotFoundWarnings: true,
  },

  i18n: {
    lazy: true,
    parsePages: false,
    langDir: 'lang/',
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        file: 'en-US.js',
        name: 'English',
      },
      {
        code: 'ru',
        file: 'ru-RU.js',
        name: 'Russian',
      },
      {
        code: 'ua',
        file: 'ua-UA.js',
        name: 'Ukrainian',
      },
    ],
  },
};

export default config;
