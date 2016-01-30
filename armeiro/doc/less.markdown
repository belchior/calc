# less
## Mapeando arquivos e diretórios

```javascript
{
  "armeiro": {
    "less": {
      "orig": [
        "src/less/**/*.less"
      ],
      "dest": "build/",
      "mainFile": "style.less.css",
      "mainFileCompressed": "style.min.less.css"
    }
  }
}
```
## Lista de comandos
```shell
# documentation
gulp doc

# build
gulp build:less

# compile
gulp compile:less

# compress
gulp compress:less

# concat
gulp concat:less

# delete
gulp delete:less

# watch
gulp watch:less:build
gulp watch:less:compile
gulp watch:less:compress
gulp watch:less:concat
```
