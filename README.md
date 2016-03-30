Borealis Flaring Project - Sandbox repository
=============================================


Getting started
---------------

1. Start the local web server: `node static-web-server.js`
2. Fetch updates to this repository: `git pull`. See this [git tutorial](https://git-scm.com/docs/gittutorial) for an introduction to git.



Development using the runtime only
----------------------------------

```
mkdir runtime; cd runtime
wget https://openui5.hana.ondemand.com/downloads/openui5-runtime-1.36.5.zip
unzip openui5-runtime-1.34.8.zip
```


Setup SDK
---------

The download page at [openui5.org](http://openui5.org/download.html) lists the different
availble releases.

Currently is `v1.34.9` the latest stable release. Fetch with:
`wget https://openui5.hana.ondemand.com/downloads/openui5-sdk-1.34.9.zip` (or just open the page
in a browser). Unzip into a separate folder: `unzip -d openui5-sdk openui5-sdk-1.34.9.zip`.

Download the samples using Firefix (Safari don't work for some reason).


OpenUI5 Source
-------------

I've tested installing with NodeJS `v0.12.5` and it works. I was not able to install with `v5.3.0`

```
git clone https://github.com/SAP/openui5.git
cd openui5
npm install
grunt serve
```

Test with: http://localhost:8080/testsuite/

