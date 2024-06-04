// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode"],
  app: {
    head: {
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0"
        }
      ],
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com/"
        },
        {
          rel: "preconnect",
          href: "https://www.gstatic.com/",
          crossorigin: '',
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
        }
      ]
    }
  },
  tailwindcss: {
    cssPath: [
      '~/assets/css/tailwind.css',
      { injectPosition: 0 }
    ],
    configPath: 'tailwind.config.ts',
    exposeConfig: false,
    viewer: true,
  },
  colorMode: {
    classSuffix: ''
  }
})
