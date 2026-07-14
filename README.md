# Despliegue de Aplicación Web en VPS con Docker y Traefik

Este proyecto consiste en el despliegue de una aplicación web completa de arquitectura cliente-servidor (Frontend + Backend + Base de Datos) utilizando un servidor VPS (Virtual Private Server). La infraestructura está completamente dockerizada y orquestada mediante **Traefik** como proxy inverso, gestionando de forma automática los certificados SSL (HTTPS).

## URLs de los Servicios Desplegados

Todos los servicios están securizados con HTTPS mediante Let's Encrypt y accesibles de forma global:

*   **Aplicación (Frontend):** [https://david.byronrm.com](https://david.byronrm.com)
*   **API (Backend):** [https://backdavid.byronrm.com](https://backdavid.byronrm.com)
*   **Administrador de Base de Datos (pgAdmin):** [https://pgdavid.byronrm.com](https://pgdavid.byronrm.com)
*   **Gestor de Contenedores (Portainer):** [https://portainerdavid.byronrm.com](https://portainerdavid.byronrm.com)

---

##  Diagrama de Arquitectura de la Solución

[ Cliente / Navegador ]
                           │ (Petición HTTPS)
                           ▼
                  [ Puerto 80 / 443 ]
                           │
                           ▼
                     [ TRAEFIK ] (Proxy Inverso)
       ┌───────────────────┼───────────────────┬───────────────────┐
       ▼ (Enrutamiento)    ▼                   ▼                   ▼
 [ frontend ]        [ backend ]        [ pgAdmin 4 ]        [ Portainer ]
                     (Express/Node)          │
                           │                 │ (Consulta)
                           ▼                 ▼
                    [ postgresql ] <─────────┘
                   (Base de Datos)

### Explicación de la Arquitectura:
1. **Traefik** escucha en los puertos `80` (HTTP) y `443` (HTTPS) de la IP pública del VPS. Redirige todo el tráfico HTTP a HTTPS automáticamente.
2. Basado en el nombre del subdominio de entrada (ej: `portainerdavid.byronrm.com`), Traefik sabe exactamente a qué contenedor interno de la red de Docker debe enviar el tráfico.
3. El contenedor de **PostgreSQL** no expone sus puertos directamente al exterior, garantizando la seguridad. Solo se comunica de manera interna con el **Backend** y con **pgAdmin** a través de la red privada puente (*bridge network*) de Docker.

---

## Tecnologías y Componentes Utilizados

*   **VPS:** Servidor virtual Contabo.
*   **Docker & Docker Compose:** Contenedorización de todos los servicios para garantizar un entorno idéntico entre desarrollo y producción.
*   **Traefik:** Proxy inverso moderno y nativo de la nube que detecta dinámicamente los contenedores y genera certificados SSL de Let's Encrypt automáticamente.
*   **Portainer CE:** Interfaz gráfica para la administración y monitorización del estado de los contenedores Docker en tiempo real.
*   **Base de Datos (PostgreSQL):** Base de datos relacional para el almacenamiento persistente de la información de los usuarios.
*   **pgAdmin 4:** Herramienta web para administrar visualmente las tablas, esquemas y registros de PostgreSQL.

---

## Instrucciones de Despliegue en el VPS

### Requisitos Previos
* Tener instalado `Docker` y `Docker Compose` en el servidor VPS.
* Configurar los registros DNS tipo `A` apuntando a la IP de tu VPS para cada subdominio.

### Despliegue con Docker Compose
Para iniciar toda la pila de contenedores en el servidor, ejecuta:

```bash
# Clonar el proyecto
git clone [https://github.com/davidpaul10/proyecto_vps.git](https://github.com/davidpaul10/proyecto_vps.git)
cd proyecto_vps

# Levantar todos los servicios en segundo plano (detached mode)
docker compose up -d

