import { defineConfig, presetWebFonts, presetWind } from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      sunglo: {
        DEFAULT: '#E57066',
        50: '#FFFFFF',
        100: '#FDF2F1',
        200: '#F7D2CF',
        300: '#F1B1AC',
        400: '#EB9189',
        500: '#E57066',
        600: '#DD4336',
        700: '#BB2C20',
        800: '#8B2118',
        900: '#5B150F',
        950: '#43100B',
      },
    },
  },
  presets: [
    presetWind(),
    presetWebFonts({
      provider: 'fontshare',
      fonts: {
        styro: 'Styro',
      },
    }),
  ],
})
