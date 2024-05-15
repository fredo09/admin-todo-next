# Development 🤓 

Pasos para levantar la base de datos 

1. Ejecuta el siguiente comando: 
````
    docker compose up -d
````

2. Renombrar el archivo .env.template a .env 
3. Agregar varaibles de entorno para el proyecto

# Prisma Commands 🏆 

## Para mas informacion visitar: [https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema] 

1. Para generar el ORM para la base de datos se usa prisma al momento de generar este configuracion usar el comando 👍 : 

````
    npx prisma init
````

2. Al generar la migración de la base de datos use el siguiente comando:
    Cabe mensionar que el nombre **"dev"** puede ser el que uno guste.

````
    npx prisma migrate dev
````


>[!NOTE]
>
> Recuerda que al momento de hacer algún cambio en el modelo ya se ** quitar o modificar** una propiedad tendras que ejecutar de nuevo la migracion con el comando anterior.

3. Para hacer la manipulacion a la base de datos usar el siguiente comando: 

````
    npx prisma generate
````