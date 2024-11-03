<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Data Dummy API

1. Clonar proyecto
2. `npm install`
3. Clonar el archivo `.env.template` y renombrarlo a `.env`
4. Cambiar las variables de entorno
5. Levantar base de datos

```
docker-compose up -d
```

6. Levantar: `npm run dev`

7. Ejecutar SEED para creacion de datos users, posts y comments a continuacion rutas necesarias para llenado de base de datos

```
http://localhost:3000/api/seed/getusers
http://localhost:3000/api/seed/getposts
http://localhost:3000/api/seed/getcomments
```
