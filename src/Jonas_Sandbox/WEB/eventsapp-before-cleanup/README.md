Installation: `npm install`. `gulp` needs to be installed globally: `npm intall -g gulp-cli`

Install OpenUI5
---------------

OpenUI5 is manged with `bower`. Download with: `bower install`


Build process
-------------

1. `gulp clean`
2. `gulp` (runs the default task)
3. `gulp zip` - package everythying needed into a zip file
4. Login to MII and import a projct. The zip-file can be found in the `mii` folder in the root of the repo
5. `cd` into the `mii` folder and do `unzip -l sapui5-sandbox` to list the contents of the zip file
to check that everything is ok

NOTE: When importing projects into MII, delete the project first. Old files no longer present in the project
will otherwise not be deleted.


Troubleshooting
---------------

1. Import error in Mii. Make sure to do `gulp clean-zip` before running `gulp zip`
