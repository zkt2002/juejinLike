// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  runtimeConfig: {
    isServer: true,
    public: {
      baseURL: '',
    },
  },
  css: [
    '@/assets/style/common.less',
    '@/assets/style/theme.less',
    '@/assets/style/style.less',
    'element-plus/dist/index.css',
  ], // 默认全局css样式
  modules: ['@pinia/nuxt', '@vueuse/nuxt'],
  app: {
    head: {
      title: '稀土掘金',
      meta: [
        {
          content:
            '掘金是面向全球中文开发者的技术内容分享与交流平台。我们通过技术文章、沸点、课程、直播等产品和服务，打造一个激发开发者创作灵感，激励开发者沉淀分享，陪伴开发者成长的综合类技术社区。',
        },
      ],
    },
  },
});
