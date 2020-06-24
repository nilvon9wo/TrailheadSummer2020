const {jestConfig} = require('@salesforce/sfdx-lwc-jest/config');
module.exports = {
    ...jestConfig,
    moduleNameMapper: {
        '^c/displayPanel$': '<rootDir>/force-app/test/jest-mocks/c/displayPanel',
        '^lightning/button$': '<rootDir>/force-app/test/jest-mocks/lightning/button',
        '^thunder/hammerButton$': '<rootDir>/force-app/test/jest-mocks/thunder/hammerButton'
    },
    setupFiles: []
};
