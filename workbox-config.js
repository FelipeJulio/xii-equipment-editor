module.exports = {
	globDirectory: 'public/',
	globPatterns: [
		'**/*.{png,svg,json}'
	],
	swDest: 'public/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};