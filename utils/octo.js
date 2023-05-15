import { Octokit } from "octokit"

let octo = new Octokit()

const octoInit = function (token) {
	// If token undefined, just continue. Empty init is already done.
	if (!token) {
		return
	}

	octo = new Octokit({
		auth: token,
	})
}

const octoRequest = async function (url, data) {
	return await octo.request(url, data)
}

export { octoInit, octoRequest }
