import { octoRequest } from "./octo.js"

/**
 * Get date of previous version
 * @param {Object} runtimeConfig 
 * @returns 
 */
async function getPreviousDate(runtimeConfig) {
	const tagsResponse = await octoRequest(`GET /repos/${runtimeConfig.repository}/tags`, {})
	const searchedTag = tagsResponse.data.find(tag => tag.name === `${runtimeConfig.previousVersion}`)

	const singleTagResponse = await octoRequest(`GET ${searchedTag.commit.url}`, {})
	return new Date(singleTagResponse.data.commit.author.date)
}

export default getPreviousDate
