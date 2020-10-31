module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },

    "extends": [
        "eslint:recommended",
        "plugin:vue/essential"
    ],

    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },

    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },

    "plugins": [
        "vue"
    ],

    "rules": {
    },

    overrides: [
      {
        files: [
          '**/__tests__/*.{j,t}s?(x)',
          '**/tests/unit/**/*.spec.{j,t}s?(x)'
        ],
        env: {
          jest: true
        }
      }
    ]
};
