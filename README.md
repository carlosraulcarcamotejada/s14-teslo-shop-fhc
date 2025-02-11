# Descripción 

## Ejecutar en Dev
1. Clonar repositorio
2. Crear una copia del archivo ```.env.template``` y renombrarlo a ```.env``` y cambiar las variables de entorno
3. Instalar las dependecias ```npm install```
4. Levantar la base de datos ```docker compose up -d```
5. Ejectar las migraciones de Prisma ```npx prisma migrate dev```
6. Ejecutar el seed ```npm run seed ```
7. Ejecutar el proyecto ```npm run dev```


## Ejecutar en Prod
1. Clonar repositorio
2. Instalar las dependecias ```npm install```