# v0.3.2 - 2018-05-08

+ fix some tslint warnings
+ add types for `lodash.iserror`
+ upgrade package versions:


| pkg                    | from v | to v    |
|------------------------|--------|-------- |
| @types/chalk           | 0.4.31 | removed |
| @types/express         | 4.0.33 | 4.11.1  |
| @types/node            | 6.0.45 | 9.6.14  |
| @types/serve-static    | 1.7.31 | 1.13.2  |
| @types/lodash.iserror  | ------ | 3.1.3   |
| chalk                  | 1.1.3  | 2.4.1   |
| typescript             | 2.0.3  | 2.8.3   |
| tslint                 | 3.10.2 | 5.10.0  |



# v0.3.1

+ fix `.npmignore` issues.
+ add `typescript` as a prod dependency (the module should be compiled on the client when install from github).

# v0.3.0

+ update `README.md`.
+ move typings to `node_modules/@types`.
+ remove "tofile" support (coming soon).
+ update typescript compiler to v2.0.3.
+ update code styling and `tslint` settings.

# v0.2.0-alpha.3

+ add *write-to-file* support for the logger middleware.

# v0.2.0-alpha.2

+ fix *write-to-file* feature.
+ add missing `warning` method (alias for warn).
+ add basic `tslint.json` config.

# v0.2.0-alpha.1

+ add basic *logs-to-file* feature vía `--tslogger-file "cwd/relative/path"`.
+ add a `warning` method (alias warn).
+ add basic `tslint.json` config.
