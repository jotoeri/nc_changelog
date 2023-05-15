Use as:
`npm run generate -- --version=3.3.0`

CLI Options
- `ghtoken` - Token to access github. Necessary for large number of requests.
- `repo` - including org and repo -> e.g. `nextcloud/forms`
- `base` - Base-Branch, the PRs are merged to. Defaults to `main`
- `out` - Output Filename. Defaults to `nc_changelog.md`
- `releaseDate` - Date of the new release. Defaults to today's date.
- `version` - Tag-Name of upcoming release.
- `previousVersion` - Tag-Name of the previous release. Defaults to latest Github release.

All these options are possible to store a default value in npm-config as `ncc_${option}`. Such they dont have to be given on each execution.