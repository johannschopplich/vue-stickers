import antfu from '@antfu/eslint-config'
import unocss from '@unocss/eslint-config/flat'

export default [
  unocss,
  ...antfu(
    {},
    {
      ignores: [
        'tsconfig.json',
      ],
    },
  ),
]
