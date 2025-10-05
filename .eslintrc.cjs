module.exports = {
  root: true,
  extends: ['next', 'next/core-web-vitals', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    // You’re intentionally using plain <img> for now
    '@next/next/no-img-element': 'off',

    // Keep moving fast — you can tighten later
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

    // Router link rule is good, but stop it from failing builds
    '@next/next/no-html-link-for-pages': 'warn',

    // React hooks reminder → warn, not error
    'react-hooks/exhaustive-deps': 'warn',
  },
};
