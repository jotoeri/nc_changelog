import { octoRequest } from "./octo.js"

/**
 * Get date of previous version
 * @param {Object} runtimeConfig 
 * @returns 
 */
async function getPreviousVersion(runtimeConfig) {
	const releaseResponse = await octoRequest(`GET /repos/${runtimeConfig.repository}/releases/latest`, {})
	return releaseResponse.data.tag_name
}

export default getPreviousVersion
