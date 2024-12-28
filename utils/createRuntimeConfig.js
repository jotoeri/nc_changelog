import { readFileSync } from 'fs'

function createRuntimeConfig() {
	const runtimeConfig = {}
	const processArgs = readProcessArgs()
	let configFile = {}

	// Read config file
	try {
		configFile = JSON.parse(readFileSync('./config.json'))
	} catch (err) {
		console.info('No config file found.')
	}

	// Read github token
	runtimeConfig.ghtoken = processArgs.ghtoken ? processArgs.ghtoken : configFile.ghtoken

	// Read repository
	runtimeConfig.repository = processArgs.repository ? processArgs.repository : configFile.repository

	// Read base branch
	runtimeConfig.baseBranch = processArgs.base ? processArgs.base :
		(configFile.base ? configFile.base : 'main')

	// Read version
	runtimeConfig.version = processArgs.version ? processArgs.version :
		(configFile.version ? configFile.version : 'Unreleased')

	// Read previous version
	runtimeConfig.previousVersion = processArgs.previousVersion ? processArgs.previousVersion : configFile.previousVersion

	// Read release date
	runtimeConfig.releaseDate = processArgs.releaseDate ? processArgs.releaseDate : configFile.releaseDate
	if(!runtimeConfig.releaseDate) {
		// If no date set, take current time.
		// Using swedish format for date, but iso formatted date-string.
		const now = new Date()
		runtimeConfig.releaseDate = now.toLocaleDateString('sv')
	}

	// Read exclude labels
	runtimeConfig.excludeLabels = processArgs.excludeLabels ? processArgs.excludeLabels.split(",") :
		(configFile.excludeLabels ? configFile.excludeLabels : ['dependencies'])

	// Read outFile
	runtimeConfig.outFile = processArgs.out ? processArgs.out :
		(configFile.out ? configFile.out : 'nc_changelog.md')

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
