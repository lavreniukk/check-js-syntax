import { ESLint } from 'eslint';

const eslint = new ESLint({
  useEslintrc: false,
  overrideConfig: {
    extends: ['eslint:recommended'],
    parserOptions: {
      sourceType: 'module',
      ecmaVersion: 'latest',
    },
    env: {
      es2022: true,
      node: true,
    },
    rules: {
      'no-console': 'error',
      'no-empty': 'error',
      'no-extra-parens': 'warn',
      'no-const-assign': 'error',
      'no-unused-vars': 'error',
      'semi': ['error', 'always'],
      'no-var': 'warn',
      'max-len': ['warn', { code: 100 }],
      'no-unreachable': 'warn',
      'no-inline-comments': 'warn',
      'no-undef': 'warn',
      'no-tabs': 'warn',
      'no-extra-semi': 'warn',
      'no-magic-numbers': ['warn', { ignore: [-1, 0, 1] }],
    },
  },
});

const checkSyntax = async (req, res) => {
  try {
    const { codeToCheck } = req.body;

    if (!codeToCheck) {
      throw new Error('No code to check');
    }

    const result = await eslint.lintText(codeToCheck);

    if (!result) {
      throw new Error('Linter failed');
    }
console.log(result);
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export { checkSyntax };
