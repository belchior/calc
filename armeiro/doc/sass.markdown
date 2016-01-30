# sass
## Mapeando arquivos e diretórios

```javascript
{
  "armeiro": {
    "sass": {
      "orig": [
        "src/sass/**/*.{sass,scss}"
      ],
      "dest": "build/",
      "mainFile": "style.sass.css",
      "mainFileCompressed": "style.min.sass.css"
    }
  }
}
```
## Lista de comandos
```shell
# documentation
gulp doc

# build
gulp build:sass

# compile
gulp compile:sass

# compress
gulp compress:sass

# concat
gulp concat:sass

# delete
gulp delete:sass

# watch
gulp watch:sass:build
gulp watch:sass:compile
gulp watch:sass:compress
gulp watch:sass:concat
```
