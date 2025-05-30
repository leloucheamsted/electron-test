/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
    },
    transformIgnorePatterns: [
        "/node_modules/(?!(react-markdown|estree-util-is-identifier-name|hast-util-to-jsx-runtime|remark-parse|remark-rehype|rehype-raw|rehype-sanitize|micromark|unified|uuid|devlop)/)"

    ],

    moduleNameMapper: {
        '\\.(css|less|scss)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};

