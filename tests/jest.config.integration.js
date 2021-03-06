module.exports = {
	verbose: true,
	testMatch: [
		// '<rootDir>/api/compare_http_rpc/*.test.js',
		// '<rootDir>/api/compare_staging_mainnet/*.test.js',
		'<rootDir>/integration/api/http/*.test.js',
		'<rootDir>/integration/api/rpc/*.test.js',
	],
	testEnvironment: 'node',
	testTimeout: 20000,
	setupFilesAfterEnv: [
		'jest-extended',
		'<rootDir>/helpers/setupCustomMatchers.js',
	],
	watchPlugins: [
		['jest-watch-toggle-config', { setting: 'verbose' }],
		['jest-watch-toggle-config', { setting: 'bail' }],
		['jest-watch-toggle-config', { setting: 'notify' }],
		'jest-watch-typeahead/filename',
	],
};
