#! /usr/bin/env node
import createMdContent from "./utils/createMdContent.js"
import fetchUsablePulls from "./utils/fetchUsablePulls.js"
import getPreviousDate from "./utils/getPreviousDate.js"
import getPreviousVersion from "./utils/getPreviousVersion.js"
import createRuntimeConfig from "./utils/createRuntimeConfig.js"
import { octoInit } from "./utils/octo.js"
import writeOut from './utils/writeOut.js'

const runtimeConfig = createRuntimeConfig()

octoInit(runtimeConfig.ghtoken)

if (!runtimeConfig.previousVersion) {
	runtimeConfig.previousVersion = await getPreviousVersion(runtimeConfig)
	console.debug(`No previous version set. Using latest release ${runtimeConfig.previousVersion}\n`)
}

const previousDate = await getPreviousDate(runtimeConfig)
console.debug('previousDate ', previousDate)

const usablePulls = await fetchUsablePulls(runtimeConfig, previousDate)
const fileContent = createMdContent(runtimeConfig, usablePulls)
writeOut(runtimeConfig, fileContent)
