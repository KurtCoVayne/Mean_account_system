# Sistema de servicios bancarios del lado del servidor.
Aplicación bancaría creada como un proyecto personal que posee sistema de Cajero Automatico(Repartir x cantidad de dinero con la menor cantidad de billetes) y sistema de transacciones y de creditos o prestamos entre usuarios solo con usar su correo, también un sistema de balance personal y tablas.

Resultado final del proyecto: https://serverside-bank-system.herokuapp.com/

## Construido con:

[NodeJS](https://nodejs.org/es/): Entorno de ejecucion que me permite usar Javascript del lado del servidor para todas las funciones dentro de este.

[Express](https://expressjs.com/): Marco de aplicacion que me permite crear la API de una forma sencilla dentro de NodeJS.

[MongoDB](https://www.mongodb.com/es): Sistema de base de datos que permite almacenar toda la informacion de usuarios, transacciones, deudas, etc...

[Mongoose](https://mongoosejs.com/): Biblioteca/dependecia que permite conectar una base de datos de MongoDB y crear todos los esquemas, modelos y documentos.

[SocketIO](https://socket.io/): Biblioteca que permite la conexion bidireccional, bilateral en tiempo real para los clientes y el servidor. Usada para la comunicación de la funcionalidad chat *(version 1.2.0)*

### Versiones disponibles.

Todo el sistema de versiones está hecho(semanticamente) bajo mi criterio de que es una versión y que no. Para las versiones disponibles [Versiones del repositorio](https://github.com/KurtCoVayne/bank_serverside_system/tags).
* **Detalles de la ultima version(1.2.0)** - *Fue añadido un sistema de chat disponible para los usuarios registrados, que incluye también un sistema de mensajes privados con el comando /w*.

## Autores:
* **John Alejandro Gonzalez** - *Trabajo completo* - [LinkedIn](https://www.linkedin.com/in/j84486b177/)
## Licencia
Este proyecto está bajo la licensia ISC para su uso o copia, ya que es un proyecto con fin educativo, y libre. Todo siempre y cuando cuando se asuman los creditos al autor como dice lo siguiente.

Copyright (c) 2019, John Alejandro Gonzalez [Contacto](johnalejandrog.g4@gmail.com).

Se concede por la presente el permiso para usar, copiar, modificar y/o 
distribuir este software para cualquier propósito con o sin cargo, 
siempre y cuando el aviso de copyright anterior y este aviso de permiso 
aparezcan en todas las copias. 

## Agradecimientos.

Este proyecto fue posible gracias a la cantida de documentación presente en la cantidad de librerias usadas en este.
Este proyecto se hace con una intención *autodidacta* de aprender el uso de las tecnologias mencionadas anteriormente. También como una forma de demostrar el uso de los sistemas informaticos para revolucionar la economia de los paises latinoamericanos, y como se debe apuntar al futuro de la economia mundial.
