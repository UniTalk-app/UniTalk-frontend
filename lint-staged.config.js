module.exports = {
    "**/*.{js,ts,tsx,jsx}": [
        () => "eslint --fix",
    ],
    "**/*.{ts,tsx}": () => "yarn typecheck",
};
  