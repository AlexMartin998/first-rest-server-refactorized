'use strict';

const { serverModel } = require('./models');

console.clear();

serverModel.listen();

/* 








*/

/** Refactorize
 * Instalaciones necesarias:
	- Dependencias
			npm i express cors dotenv express-validator bcryptjs mongoose jsonwebtoken cloudinary uuid express-fileupload

			npm install google-auth-library --save

	- Dev


	// // // RESUELTO en  user.controller.js
	//TODO: RESUELTO - Si es Admin puede eliminar otras cuentas y la suya
	//TODO: RESUELTO - Si es el mismo user puede eliminar su cuenta, pero NO otras
		- Crear modulos diferentes para el Admin y users??
		- Obtenemos el id de req.params y comparamos con el uid del user autenticado que viene en el token.
			if (id !== uid) return res.status(401).json({ msg: 'Unauthorized!' });
 * 
 *
 */