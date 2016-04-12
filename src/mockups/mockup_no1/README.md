Installation: `npm install`. `gulp` needs to be installed globally: `npm intall -g gulp-cli`


Build process
-------------

1. `gulp clean`
2. `gulp` (runs the default task)
3. `gulp mii` - package everythying needed into a zip file
4. Login to MII and import a projct. The zip-file can be found in the `mii` folder in the root of the repo
5. `cd` into the `mii` folder and do `unzip -l sapui5-sandbox` to list the contents of the zip file
to check that everything is ok
