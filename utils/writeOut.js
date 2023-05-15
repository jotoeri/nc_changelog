import fs from 'fs'

/**
 * Write file content
 * @param {Object} runtimeConfig 
 * @param {String} fileContent 
 */
const writeOut = function (runtimeConfig, fileContent) {
	fs.writeFile(runtimeConfig.outFile, fileContent, (error) => {
		if (error) {
			console.error(error)
		}
	})
}

export default writeOut
