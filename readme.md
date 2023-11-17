# Notes Api

## Description del proyecto

Estr proyecto es una api de notas, que permitira a los usuarios, registrarse, iniciar sesión, crear tu nota, editar nota, archivar nota y eliminar nota. La aplicación esta construida utlizando node.js, express y utiliza como base de datos PostgreSQL, para almacenar la información.

## Caracteristicas principales
1. Registro de usuario
2. Loguearse con un usuario
3. Crear Nota
4. Editar Nota
5. Archivar Nota
6. Eliminar Nota
7. Listar Notas
7. Buscar nota

## Tecnologias utilizadas
1. express: Un framework minimalista de Node.js que facilita la creación de aplicaciones web y APIs.
4. postgreSQL: Un sistema de gestión de bases de datos relacionales de código abierto.
6. jsonwebtokens: JWT (Json Web Token) es un estandar que esta dentro del documento RFC 7519.

## Requisitos previos para utilizar el proyecto
1. Tener node instalado en el equipo
2. Tener postgreSQL instalado
3. Tener creada una base de datos en postgreSQL

## Como ejecutar el proyecto
1. Clonar el repositorio
2. Ejecutar npm install
```
    npm install
```
3. Crearese la base de datos local con postgreSQL
5. Clonar el .env.template y renombralo a .env
6. Llenar las variables de entorno
7. Levantar el modo de desarrollo utilizando el comando: 
```
    npm run dev
```