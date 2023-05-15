import filterRemainder from "./filterRemainder.js"
import findLabel from "./findLabel.js"

/**
 * Function to create the Markdown Content out of the given PRs
 * @param {Object} runtimeConfig
 * @param {Array} pulls
 * @returns {String} Markdown Content to write out
 */
const createMdContent = function (runtimeConfig, pulls) {
	let content = ''
	let filtered = []
	let remainder = pulls.slice()

	// Add title
	content += `## ${runtimeConfig.version} - ${runtimeConfig.releaseDate}\n`;

	// Add link to full changelog
	content += `\n[Full Changelog](https://github.com/${runtimeConfig.repository}/compare/${runtimeConfig.previousVersion}...${runtimeConfig.version})\n`

	// Add Enhancements
	;({filtered, remainder} = filterRemainder(remainder, findLabel, ['enhancement'])) // Outer brackets  and preceding semicolon necessary for destructuring.
	if (filtered.length) {
		content += `\n### Enhancements\n`
		filtered.forEach(pull => 
			content += getPullMdLine(pull)
		)
	}

	// Add Bugs
	;({filtered, remainder} = filterRemainder(remainder, findLabel, ['bug'])) // Outer brackets and preceding semicolon necessary for destructuring.
	if (filtered.length) {
		content += `\n### Fixed\n`
		filtered.forEach(pull => 
			content += getPullMdLine(pull)
		)
	}

	// Add Remainders
	if (remainder) {
		content += `\n### Merged\n`
		remainder.forEach(pull => 
			content += getPullMdLine(pull)
		)
	}

	return content
}

/**
 * Create Markdown-Line to denote a PR.
 * @param {Object} pull Pull-Request Object
 * @returns {String} Md-Line to denote PR
 */
const getPullMdLine = function(pull) {
	return `- ${pull.title} [\\#${pull.number}](${pull.html_url}) ([${pull.user.login}](${pull.user.html_url}))\n`
}

export default createMdContent
