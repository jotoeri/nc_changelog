/**
 * Filter Array and return both, filtered and remaining elements.
 * @param {Array} arr The array to filter
 * @param {callback} callback Callback with boolean return value
 * @param {Array} callbackArgs Additional arguments, that are passed to the callback.
 * @returns {Object} Object containing filtered and remainder PRs in respective arrays.
 */
const filterRemainder = function(arr, callback, callbackArgs) {
	const res = arr.reduce( (res, current) => {
		callback(current, ...callbackArgs) ? res.filtered.push(current) : res.remainder.push(current)
		return res
	}, {
		filtered: [],
		remainder: []
	})
	return res
}

export default filterRemainder
