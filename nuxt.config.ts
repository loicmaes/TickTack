// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode", "shadcn-nuxt"],
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
          href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
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
  },
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET,
  }
})
