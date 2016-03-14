Setup OpenUI5
-------------

I've tested installing with `v0.12.5` and it works. I was note able to install with `v5.3.0`

```
git clone https://github.com/SAP/openui5.git
cd openui5
npm install
grunt serve
```

Test with: http://localhost:8080/testsuite/


Setup SAPUI5
------------

```
#mv sap-ui-core.js sapui5/resources/

mkdir openui-runtime; cd openui-runtime
wget https://openui5.hana.ondemand.com/downloads/openui5-runtime-1.34.8.zip
unzip openui5-runtime-1.34.8.zip

mkdir -p $INST/sapui5
mv resources $INST/sapui5/
```

