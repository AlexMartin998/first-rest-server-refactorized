'use strict';

const express = require('express');
const cors = require('cors');

const { PORT } = require('../config');
const dbConnection = require('../db/config.db');
const { usersRoutes, authRoutes } = require('../routes');

class Server {
  constructor() {
    this.app = express();
    this.port = PORT;

    this.paths = {
      users: '/api/users',
      auth: '/join',
    };

    // Connect DB
    this.connectToDB();

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  async connectToDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.paths.users, usersRoutes);
    this.app.use(this.paths.auth, authRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server on port ${this.port}`);
    });
  }
}

module.exports = new Server();
