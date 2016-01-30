# js
## Mapeando arquivos e diretórios

```javascript
{
  "armeiro": {
    "js": {
      "orig": [
        "src/js/**/*.js"
      ],
      "dest": "build/",
      "mainFile": "script.js",
      "mainFileCompressed": "script.min.js"
    }
  }
}
```
## Lista de comandos
```shell
# documentation
gulp doc

# build
gulp build:js

# compress
gulp compress:js

# concat
gulp concat:js

# delete
gulp delete:js

# watch
gulp watch:js:build
gulp watch:js:compress
gulp watch:js:concat
```
