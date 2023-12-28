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

    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export { checkSyntax };
