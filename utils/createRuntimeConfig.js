function createRuntimeConfig() {
	const runtimeConfig = {}
	const processArgs = readProcessArgs()

	// Read github token
	runtimeConfig.ghtoken = processArgs.ghtoken ? processArgs.ghtoken : process.env.npm_config_ncc_ghtoken

	// Read repository
	runtimeConfig.repository = processArgs.repository ? processArgs.repository : process.env.npm_config_ncc_repository

	// Read base branch
	runtimeConfig.baseBranch = processArgs.base ? processArgs.base :
		(process.env.npm_config_ncc_base ? process.env.npm_config_ncc_base : 'main')

	// Read version
	runtimeConfig.version = processArgs.version ? processArgs.version :
		(process.env.npm_config_ncc_version ? process.env.npm_config_ncc_version : 'Unreleased')

	// Read previous version
	runtimeConfig.previousVersion = processArgs.previousVersion ? processArgs.previousVersion : process.env.npm_config_ncc_previousVersion

	// Read release date
	runtimeConfig.releaseDate = processArgs.releaseDate ? processArgs.releaseDate : process.env.npm_config_ncc_releaseDate
	if(!runtimeConfig.releaseDate) {
		// If no date set, take current time.
		// Using swedish format for date, but iso formatted date-string.
		const now = new Date()
		runtimeConfig.releaseDate = now.toLocaleDateString('sv')
	}

	// Read outFile
	runtimeConfig.outFile = processArgs.out ? processArgs.out :
		(process.env.npm_config_ncc_out ? process.env.npm_config_ncc_out : 'nc_changelog.md')

	console.debug(runtimeConfig)
	return runtimeConfig
}

function readProcessArgs() {
	const processArgs = {}

	process.argv.forEach(arg => {
		// Only use arguments starting with --
		if (!arg.startsWith('--')) {
			return
		}

		// If equal-sign exists, extract key and value, otherwise use arg as key and set value to true
		const split = arg.indexOf('=')
		const key = (split >= 2) ? arg.substring(2,split) : arg.substring(2)
		const value = (split >= 2) ? arg.substring(split+1) : true
		
		processArgs[key] = value
	})

	return processArgs
}

export default createRuntimeConfig
