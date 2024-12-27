Use as:
`npm run generate -- --version=3.3.0`

The following options can be given to the script either via CLI Argument or as a key value pair in a file named `config.json` in the repository root.
- `ghtoken` - Token to access github. Necessary for large number of requests.
- `repository` - including owner and repository -> e.g. `nextcloud/forms`
- `base` - Base-Branch, the PRs are merged to. Defaults to `main`
- `out` - Output Filename. Defaults to `nc_changelog.md`
- `releaseDate` - Date of the new release. Defaults to today's date.
- `version` - Tag-Name of upcoming release.
- `previousVersion` - Tag-Name of the previous release. Defaults to latest Github release.
- `excludeLabels` - Array of strings. PRs which contain at least one of the given labels will be excluded. Defaults to `["dependencies"]`. As CLI Argument these should be given as comma-separated list, e.g. `--excludeLabels=dependencies,translations`
