Funcionalidad:
La aplicación le permite navegar por la página de inicio que es el catálogo de productos de la pastelería Entre migas y masas, donde se puede consultar cada uno de los detalles del producto y agregarlos a su carrito para un pago posterior.
Tiene 2 tipos de acceso al sistema, como cliente donde se podrá comprar y el perfil de administrador, donde se podrá modificar el listado de productos mediante formularios.
Agregar productos al carrito hará que aparezca una notificación e indicará que el producto se agregó correctamente.
Puede ver una vista previa del carrito en la barra superior o incluso navegar a una página de carrito más detallada.
El proceso de pago es un formulario de varias páginas que al final le permite realizar un pedido que luego se mostrará en la página del historial de pedidos del cliente.

Prerrequisitos:

Asegúrese de instalar lo siguiente:

•	Versión 17.4 o una posterior de Visual Studio 2022 con la carga de trabajo desarrollo web y ASP.NET instalada. Vaya a la página de descargas de Visual Studio para instalarlo de forma gratuita. Si tiene que instalar la carga de trabajo y ya tiene Visual Studio, vaya a Herramientas>Get Tools and Features... (Obtener herramientas y características…) que abre el Instalador de Visual Studio. Elija la carga de trabajo Desarrollo de ASP.NET y web y después elija Modificar.

•	npm (https://www.npmjs.com/), que se incluye con Node.js

•	npx (https://www.npmjs.com/package/npx)

Debemos tener Express JS v4x, node v16x y npm instalados. Además, necesitará un servidor MySQL en ejecución para tener la funcionalidad completa de la aplicación, se recomienda XAMPP.
XAMPP es una distribución de Apache fácil de instalar que contiene MariaDB, PHP y Perl. Simplemente descarga y ejecuta el instalador.
La ruta para administrar las BD es http://localhost:80/
Instalación de Node.js:
Descargar desde https://nodejs.org/es/download y ejecutar la instalación.
Instalación de Express.js:
Suponiendo que ya ha instalado Node.js, cree un directorio para que contenga la aplicación y conviértalo en el directorio de trabajo. 
$ mkdir myapp
$ cd myapp

Utilice el mandato npm init para crear un archivo package.json para la aplicación. Para obtener más información sobre cómo funciona package.json, consulte Specifics of npm’s package.json handling.
$ npm init

Este mandato solicita varios elementos como, por ejemplo, el nombre y la versión de la aplicación. Por ahora, sólo tiene que pulsar INTRO para aceptar los valores predeterminados para la mayoría de ellos, con la siguiente excepción:
entry point: (index.js)

Especifique app.js o el nombre que desee para el archivo principal. Si desea que sea index.js, pulse INTRO para aceptar el nombre de archivo predeterminado recomendado.
A continuación, instale Express en el directorio myapp y guárdelo en la lista de dependencias. Por ejemplo:
$ npm install express –save

Para instalar Express temporalmente y no añadirlo a la lista de dependencias, omita la opción --save:
$ npm install express
Para realizar la instalación de Angular debe abrir la terminal en Windows escribiendo CMD o puede abrir la terminal incluida en VS code la cual puede abrir con el comando CTRL+ Ñ.
 
Como ya tenemos NodeJS instalado podemos ejecutar comandos npm para instalar angular.
Para la instalación de angular debemos ejecutar el siguiente comando.
npm install -g @angular/cli
Este comando instala angular, el -g sirve para agregarlo de manera global a Windows. 

Variables de entorno
Cambiar las variables de base de datos para que coincidan con la configuración de MySQL en el archivo \backend\env\development.env
PORT=5000
DB_HOST='localhost'
DB_USER='root'
DB_PASSWORD=''
DB_NAME='app_emym'

Luego clonar la Bd desde XAMPP con la opción importar, y cargar el archivo \backend\app_emym.sql
 
Empezar

La aplicación se puede instalar clonando el repositorio git en el terminal cmd:
git clone https://github.com/ChristianSorianoS/ProyectoEmym/ <nombre_carpeta>


Luego cd para entrar en ambos directorios y ejecute el comando npm install:
cd <nombre_carpeta>
cd backend
npm run install
cd.. // para regresar a <nombre_carpeta>
cd client
npm run install


Después de toda la instalación, debe ejecutar el servidor y el cliente ejecutando estos comandos, cada uno en su propio directorio.
Para el backend
npm run dev

Para el front end (client)
npm run start

Abre tu navegador web y navega a http://localhost:4200/ para ver la aplicación en funcionamiento.

