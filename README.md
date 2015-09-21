# Nexsys - Reto Angular 

El objetivo de este proyecto es evaluar los conocimientos en el framework AngularJs.

La aplicación permite iniciar sesión con nombre de usuario y contraseña validados para realizar una llamada a un proveedor Oauth2, y recibir un bearer token.

con un bearer token valido el api autorizará los request necesarios para las demás funcionalidades del proyecto, las cuales son en general listar, agregar y editar tanto tareas como contactos.

## Inicio

Para empezar sólo se tiene que clonar el repositorio e instalar las dependencias.

### Requerimientos

Es necesario git para clonar el repositorio. Puede obtener git desde http://git-scm.com/.

También se utilizan las herramientas de Node.js para inicializar y probar reto-angular. Se puede obtener Node de http://nodejs.org/.

### Clonar reto-angular

Para clonar reto-angular usando git
```
git clone https://github.com/eucliz/reto-angular.git
cd reto-angular
```

### Instala las dependencias
Se ha configurado `npm` para ejecutar automáticamente bower. así que simplemente pueden hacer:
```
npm install
```
### Ejecutar la aplicación 

La forma más sencilla de iniciar el servidor es:
```
npm start
```
Ahora por medio del navegador en el navegador: 
`http://localhost:8000/app/index.html`

## Módulos

## Inicio de sesión

Pantalla sencilla de inicio de sesión, donde el usuario proporciona nombre de usuario y contraseña para obtener el bearer token, con el cual el api autoriza el acceso a los demás módulos, siendo el usuario y contraseña son correctos.

## Principal

Al ingresar al sistema, este está dividido en dos partes: header y container.

### Header

En el header se proporciona al usuario el control de acceso a los módulos disponibles
* contactos.
* Tareas
* salir de la app.

Nota: La sesión estará activa mientras el usuario no presione la opción de salir o que el token haya expirado, el mismo expira en 15 días a partir del inicio de sesión. La sesión es persistente a los cierres de navegador.

### Container

El container es donde se muestra el contenido de la app, como listas, formularios y el mapa de tareas. Se muestra informacion de:

#### Tareas

Acá se listan las tareas agregadas al sistema, las mismas se pueden visualizar en el mapa superior, según sus coordenadas. 

Además de listar la tareas también se puede agregar/editar tareas, para agregar las coordenadas a la tarea se tiene que seleccionar una posición en el mapa.

#### Contactos 

Acá se listan los usuarios agregados al sistema. Además también permite agregar nuevos contactos y editar los ya existentes.

