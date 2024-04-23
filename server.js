
// import logger from './src/utils/logger/index.js';
import express from 'express';
import cors from 'cors';

import './src/config/index.js'
import connectDB from './mongo.js';
import globalResponseController from './src/utils/response-handlers/global-response-controller.js';
import userRoute from './src/route/user-route.js';

const app = express();
app.use(cors())
app.use(express.json());
app.use('/api/user', userRoute);

const DB_URL =process.env.Database_URI;
connectDB(DB_URL);

const port = process.env.PORT || 3004;
const server = app.listen(port, () => {
  console.log(
    'CRUD API ' +
      process.env.NODE_ENV +
      ' mode on PORT ' +
      process.env.PORT +
      ' ' +
      new Date()
  );
});
app.use(globalResponseController);
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection', err);
  server.close(() => {
    process.exit(1);
  });
});
export { server };
