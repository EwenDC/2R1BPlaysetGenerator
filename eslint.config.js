// @ts-check
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import jsdoc from 'eslint-plugin-jsdoc'

export default tseslint.config(
  pluginJs.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  jsdoc.configs['flat/recommended-typescript'],
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // This is only a bug if we start messing with object prototypes
      'no-prototype-builtins': 'off',

      // Enforce JSDoc comment standards
      'jsdoc/no-blank-blocks': 'warn',
      'jsdoc/informative-docs': [
        'warn',
        { uselessWords: ['a', 'an', 'i', 'in', 'of', 's', 'the', 'to'] },
      ],
      'jsdoc/require-description': 'warn',
      'jsdoc/require-description-complete-sentence': 'warn',
      'jsdoc/require-jsdoc': [
        'warn',
        {
          publicOnly: { esm: true },
          require: {
            ArrowFunctionExpression: true,
            ClassDeclaration: true,
            ClassExpression: true,
            FunctionDeclaration: true,
            FunctionExpression: true,
            MethodDefinition: true,
          },
          checkConstructors: false,
        },
      ],
      'jsdoc/sort-tags': 'warn',

      // Disable JSDoc rules made redundant by Prettier
      'jsdoc/check-alignment': 'off',

      // Enforce use of === (except when using `== null` to check for nullish values)
      eqeqeq: ['warn', 'always', { null: 'ignore' }],

      // Copy TypeScript's behavior of allowing unused vars that are marked with an underscore
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      // Use recommended settings instead of strict ones, since we're ok with implicit conversion of primitives
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowAny: true,
          allowBoolean: true,
          allowNullish: true,
          allowNumber: true,
          allowRegExp: true,
        },
      ],

      // Ignore strings for this rule, as defaulting an empty string is a common and intuitive pattern
      '@typescript-eslint/prefer-nullish-coalescing': [
        'error',
        {
          ignorePrimitives: { string: true },
        },
      ],
    },
  },
)
