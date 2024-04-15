/* eslint-disable no-undef */
const express = require('express');
const helmet = require('helmet');
const app = express();
const mongoose = require('./loaders/mongoose.js');
const authRouter = require('./api/routes/auth.js');
const compRouter = require('./api/routes/competences.js');
const parcoursRouter = require('./api/routes/parcours.js');
const projetsRouter = require('./api/routes/projets.js');
const moiRouter = require('./api/routes/moi.js');
const PORT = process.env.PORT;

app.use(express.json());
app.use(helmet());
app.use('/auth', authRouter);
app.use('/competences', compRouter);
app.use('/parcours', parcoursRouter);
app.use('/projets', projetsRouter);
app.use('/moi', moiRouter);


async function start() {
  try {
    await mongoose.connect();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Error on server startup: ', err);
  }
}

start();