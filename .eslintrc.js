module.exports = {
  "extends": [
    "react-app",
    "airbnb",
    "prettier"
  ],
  "rules": {
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [
          ".js",
          ".jsx"
        ]
      }
    ],
    "no-useless-escape": "off",
    "no-script-url": "off",
    "jsx-a11y/anchor-has-content": "off",
    "jsx-a11y/href-no-hash": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "no-template-curly-in-string": "off",
    "react/prop-types": 0,
    "react/prefer-stateless-function": 0,
    "react/jsx-one-expression-per-line": 0,
    "linebreak-style": 0,
    "react/jsx-wrap-multilines": 0,
    "react/no-danger": 0,
    "react/forbid-prop-types": 0,
    "no-use-before-define": 0,
    "no-param-reassign": 0,
    "import/no-unresolved": 0,
    "no-console": 0,
    "react/no-multi-comp": 0,
    "no-unused-vars": 0,
    "react/no-array-index-key": 0,
    "react/jsx-indent": 0,
    "react/jsx-indent-props": 0,
    "react/jsx-closing-bracket-location": 0,
  },
  "parserOptions": {
    "ecmaFeatures": {
      "legacyDecorators": true
    }
  }
}