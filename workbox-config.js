module.exports = {
	globDirectory: 'out/',
	globPatterns: [
		'**/*.{js,css,woff2,html,png,ico,txt,svg,json}'
	],
	swDest: 'out/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};