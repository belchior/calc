# copy
## Mapeando arquivos

```javascript
{
  "armeiro": {
    "copy": [
      { "orig": "src/img/*.jpg", "dest": "build/" },
      { "orig": "src/img/sprite/*.png", "dest": "build/sprite/" },
      { "orig": "src/js/jquery-2.2.0.min.js", "dest": "build/jquery.js" }
    ]
  }
}
```
## Lista de comandos
```shell
# documentation
gulp doc

# copy
gulp copy
```
