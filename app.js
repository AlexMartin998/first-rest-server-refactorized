'use strict';

const { serverModel } = require('./models');

console.clear();

serverModel.listen();

/* 








*/

/** Tareas
 * TypeScript
	// TODO: Escribirlo en TypeScript
	// TODO: Lo que aprendi en Fazt adaptarlo a esta estructura
		- CRUD
		- Subir imgs con Morgan
		- Authentication & Authorization with JWT <-- Passport
 * 
 */


/** Refactorize
 * Instalaciones necesarias:
	- Dependencias
			npm i express cors dotenv express-validator bcryptjs mongoose jsonwebtoken cloudinary uuid express-fileupload

			npm install google-auth-library --save

	- Dev
		npm i -D nodemon


	// // // RESUELTO en  user.controller.js
	//TODO: RESUELTO - Si es Admin puede eliminar otras cuentas y la suya
	//TODO: RESUELTO - Si es el mismo user puede eliminar su cuenta, pero NO otras
		- Crear modulos diferentes para el Admin y users??
		- Obtenemos el id de req.params y comparamos con el uid del user autenticado que viene en el token.
			if (id !== uid) return res.status(401).json({ msg: 'Unauthorized!' });
	// TODO: En lugar de helpers crear Middlewares para poder enviar argumentos desde el router y verificar si existe el ID o no.
	  - Enviar la Bandera de la collection en la que debemos verificar
		- Dependiendo de la bandera revisamos en un Model u otro.

	// TODO:  RESUELTO Refactorizar los Search con un Middleware como el el Upload:
		- Se valida como middleware el ID y la Collection
		  - idExistUpload  Para todo el codigo q requiera verificar ID??
			- Ver si se puede hacer eso
			  - Se tendria 2 
					1. Para el Upload que ya esta con las collect q se permite
					2. Para todas las collec, todas las rutas
		- Se crea un Helper para que retorne el Model (user, product, etc. Lo q este permitido) y lo ocupamos en el Controller

 * 
 *
 */

/** Refactorizando REST server - Fernando Herrera
		 * Instalaciones:
			npm i express cors dotenv express-validator bcryptjs mongoose jsonwebtoken google-auth-library uuid cloudinary express-fileupload 
		
			npm i -D nodemon
		
		
			Probar: 
				- Img/Files:  Multer
				- Logger
		
		 * 
		 */
