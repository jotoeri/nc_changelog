import findLabel from "./findLabel.js"

/**
 * Check if a fetched PR is usable for us.
 * @param {Object} pr
 * @param {Object} runtimeConfig
 * @param {Date} oldestDate
 * @returns {Boolean}
 */
function checkPrUsable (pr, runtimeConfig, oldestDate) {
	// Remove unmerged
	if (!pr.merged_at) {
		return false
	}

	// Remove dependencies
	if (findLabel(pr, 'dependencies')) {
		// console.debug('Dependencies')
		return false
	}

	// Remove PRs, that are older than necessary
	const mergedAt = new Date(pr.merged_at)
	if (mergedAt <= oldestDate) {
		return false
	}

	// Debug log of usable PR
	console.debug('title: ', pr.title, '; merged: ', mergedAt)

	return true
}

export default checkPrUsable
