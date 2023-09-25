import antfu from '@antfu/eslint-config'

// TODO: Use flat config when upstream issue is fixed
// import unocss from '@unocss/eslint-config/flat'
import unocss from '@unocss/eslint-plugin'

export default [
  // unocss,
  {
    plugins: {
      unocss,
    },
    rules: {
      'unocss/order': 'warn',
      'unocss/order-attributify': 'warn',
    },
  },
  ...antfu(
    {},
    {
      ignores: [
        'tsconfig.json',
      ],
    },
  ),
]
