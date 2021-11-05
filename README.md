# Vue headless CRUD

developing `30%`

## start up

``` bash
$ npm install
$ npm run dev

# server on 3000 port
```

visit <http://localhost:3000/example/index.html> with browser


view struction

```
|- list view
|   |- nav block
|   |- title block
|   |- filter block
|   |- pagination block
|   |- table block
|       |- title cell sort
|       |- field cell
|       |- option cell
|- detail view
|   |- create view
|   |   |- form block
|   |   |- field form
|   |- detail view
|       |- field cell
```

model 

```

Entity -> useEntity -> <Entity />

<CustomComponent /> -> <slot /> -> <Entity />

<Entity> -> provider -> <CustomComponent>
```


api 
