Setup SDK
---------

The download page at [openui5.org](http://openui5.org/download.html) lists the different
availble releases.

Currently is `v1.34.9` the latest stable release. Fetch with:
`wget https://openui5.hana.ondemand.com/downloads/openui5-sdk-1.34.9.zip` (or just open the page
in a browser). Unzip into a separate folder: `unzip -d openui5-sdk openui5-sdk-1.34.9.zip`.


OpenUI5 Source
-------------

I've tested installing with `v0.12.5` and it works. I was note able to install with `v5.3.0`

```
git clone https://github.com/SAP/openui5.git
cd openui5
npm install
grunt serve
```

Test with: http://localhost:8080/testsuite/



Boilerplate app
---------------

```
git clone https://github.com/6of5/UI5SplitApp-Boilerplate.git
cd UI5SplitApp-Boilerplate
npm install
grunt server
```
