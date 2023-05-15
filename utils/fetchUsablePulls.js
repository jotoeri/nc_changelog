import { octoRequest } from "./octo.js"
import checkPrUsable from "./checkPrUsable.js"
import filterRemainder from "./filterRemainder.js"

/**
 * Fetch Pull-Requests from Github. Only fetch and store those, that we want to use.
 * @param {Object} runtimeConfig
 * @param {Date} oldestDate Don't fetch PRs older than this date (Date of previous version).
 * @returns {Array} Array of pull-requests
 */
const fetchUsablePulls = async function (runtimeConfig, oldestDate) {
	const usablePulls = []
	let page = 1
	while (1) {
		const response = await octoRequest(`GET /repos/${runtimeConfig.repository}/pulls`, {
			base: runtimeConfig.baseBranch,
			state: 'closed',
			sort: 'updated',
			direction: 'desc',
			per_page: 50,
			page,
		})

		// Abort if empty response
		if (!response.data.length) {
			console.debug('Empty Response')
			break
		}

		// Filter and Store PRs to use later on for Changelog
		const { filtered } = filterRemainder(response.data, checkPrUsable, [runtimeConfig, oldestDate])
		usablePulls.push(...filtered)

		// Extract last merged-date out of list
		let lastDate
		while (1) {
			// Take last PR out of list, that got merged. If not merged, take the next one.
			const mergedAt = response.data.pop().merged_at
			if (!mergedAt) {
				continue
			}
			lastDate = new Date(mergedAt)
			break
		}

		// Check if last merged-date is older than date of previous version. If fulfilled, leave fetch-loop.
		console.debug('lastDate: ', lastDate)
		if (lastDate <= oldestDate) {
			break
		}
		page++
	}
	return usablePulls
}

export default fetchUsablePulls
