/**
 * Check if PR contains Labels
 * @param {Object} pull Pull-Request Object to check
 * @param {Array.<string>} labels Array of labels to check for
 * @returns {Boolean} Label found
 */
const findLabels = function (pull, labels) {
	return labels.some(searchL => { 
		return pull.labels.some(l => l.name === searchL)
	})
}

export default findLabels
