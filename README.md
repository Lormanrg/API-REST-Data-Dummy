# DataDummy

## Monorepo con Turbo Repo

Este es un monorepo creado con Turbo Repo que contiene un backend desarrollado con Nest.js y un frontend desarrollado con Vite. El proyecto está hecho en React con TypeScript y se elaboro la api rest ful para elaborar consultas a api externa realizar almacenamiendo de datos y ser modificados en api local.

## Estructura del Proyecto

- **api/**: Carpeta del backend, desarrollado con Nest.js.
- **client/**: Carpeta del frontend, desarrollado con Vite y React.

## Requisitos

- Node.js
- npm (o yarn)

## Instalación

1. Clona el repositorio:

   `git clone git@github.com:Lormanrg/Data-Dummy-Monorepo.git`

Navega al directorio del proyecto:
`cd datadummy-project`

Instalar las dependencias de backend:
`npm i --workspace api`

Instalar las dependencias de frontend:
`npm i --workspace client`

Uso
Para levantar el proyecto, usa el siguiente comando:
`npm run dev` este comando debe ejecutarse en la raiz si se quiere iniciar ambas areas(front y back).
