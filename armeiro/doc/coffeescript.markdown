# coffeescript
## Mapeando arquivos e diretórios

```javascript
{
  "armeiro": {
    "coffee": {
      "orig": [
        "src/coffee/**/*.coffee"
      ],
      "dest": "build/",
      "mainFile": "script.coffee.js",
      "mainFileCompressed": “script.min.coffee.js”
    }
  }
}
```
## Lista de comandos
```shell
# documentation
gulp doc

# build
gulp build:coffee

# compile
gulp compile:coffee

# compress
gulp compress:coffee

# concat
gulp concat:coffee

# delete
gulp delete:coffee

# watch
gulp watch:coffee:build
gulp watch:coffee:compile
gulp watch:coffee:compress
gulp watch:coffee:concat
```
