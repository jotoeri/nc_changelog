/**
 * Check if PR contains Label
 * @param {Object} pull Pull-Request Object to check
 * @param {String} label Label-String to find
 * @returns {Boolean} Label found
 */
const findLabel = function (pull, label) {
	return pull.labels.find(l => l.name === label)
}

export default findLabel
