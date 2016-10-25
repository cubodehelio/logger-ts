# `. types.sh` or `npm run add-types`
#
# Use this script to add symlinks of your own types for third-party libs
# to `node_modules/types`. I made this cause adding custom directories for
# type definitions in `tsconfig.json` is not working at all :(
#
mkdir -p node_modules/@types
cd node_modules/@types
ln -s ../../types/lodash.iserror lodash.iserror
