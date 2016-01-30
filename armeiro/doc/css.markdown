# css
## Mapeando arquivos e diretórios

```javascript
{
  "armeiro": {
    "css": {
      "orig": [
        "src/css/**/*.css"
      ],
      "dest": "build/",
      "mainFile": "style.css",
      "mainFileCompressed": "style.min.css"
    }
  }
}
```
## Lista de comandos
```shell
# documentation
gulp doc

# build
gulp build:css

# compress
gulp compress:css

# concat
gulp concat:css

# delete
gulp delete:css

# watch
gulp watch:css:build
gulp watch:css:compress
gulp watch:css:concat
```
