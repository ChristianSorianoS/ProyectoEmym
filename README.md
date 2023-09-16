
# Proyecto Emym
## Funcionalidad:
La aplicación le permite navegar por la página de inicio que es el catálogo de productos de la pastelería Entre migas y masas, donde se puede consultar cada uno de los detalles del producto y agregarlos a su carrito para un pago posterior.

Tiene 2 tipos de acceso al sistema, como cliente donde se podrá comprar y el perfil de administrador, donde se podrá modificar el listado de productos mediante formularios.

Agregar productos al carrito hará que aparezca una notificación e indicará que el producto se agregó correctamente.

Puede ver una vista previa del carrito en la barra superior o incluso navegar a una página de carrito más detallada.

El proceso de pago es un formulario de varias páginas que al final le permite realizar un pedido que luego se mostrará en la página del historial de pedidos del cliente.

## Prerequisitos:

Asegúrese de instalar lo siguiente:

- 	Visual studio code  (https://code.visualstudio.com/download).

-	npm (https://www.npmjs.com/) que se incluye con Node.js

Debemos tener node v16x y npm instalados. Además, necesitará un servidor MySQL en ejecución para tener la funcionalidad completa de la aplicación, se recomienda **XAMPP**.

XAMPP es una distribución de Apache fácil de instalar que contiene MariaDB, PHP y Perl. Simplemente descarga y ejecuta el instalador.

La ruta para administrar las BD es http://localhost/phpmyadmin/

## Instalación de Node.js:

Descargar desde https://nodejs.org/es/download y ejecutar la instalación.
Variables de entorno

Cambiar las variables de base de datos para que coincidan con la configuración de MySQL en el archivo **\backend\env\development.env**

```
PORT=5000 
DB_HOST='localhost'
DB_USER='root'
DB_PASSWORD=''
DB_NAME='app_emym'
```

Luego crear la Bd desde phpmyadmin con el nombre *'app_emym'* y con la opción importar, y cargar el archivo **\backend\app_emym.sql**
 
## Ejecutar aplicacion

La aplicación se puede instalar clonando el repositorio git en el terminal cmd:

`git clone https://github.com/ChristianSorianoS/ProyectoEmym`


Luego cd para entrar en ambos directorios y ejecute el comando npm install, con este comando también se instalará Express JS:

```
cd <nombre_carpeta>
cd backend
npm install

cd.. // para regresar a <nombre_carpeta>
cd client
npm install
```

Después de toda la instalación, debe ejecutar el servidor y el cliente ejecutando estos comandos, cada uno en su propio directorio.

**Para el backend**

`npm run dev`

**Para el front end (client)**

`npm run start`

Abre tu navegador web y navega a http://localhost:4200/ para ver la aplicación en funcionamiento.



