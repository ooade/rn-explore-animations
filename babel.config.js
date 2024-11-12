const tsconfig = require('./tsconfig.json');

const { baseUrl, paths } = tsconfig.compilerOptions;

module.exports = function (api) {
	api.cache(true);

	const alias = Object.keys(paths).reduce((acc, key) => {
		const pathKey = key.replace('/*', '');
		const pathValue = paths[key][0].replace('/*', '');
		acc[pathKey] = `./${pathValue}`;
		return acc;
	}, {});

	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'module-resolver',
				{
					root: [baseUrl],
					alias,
				},
			],
		],
	};
};
