import mongoose from 'mongoose';

const connectDB = (URL) => {
  try {
    mongoose
      .connect(URL, {
        dbName: process.env.DataBaseName,
      })
      .then(() => console.log('DB Connected Successfully...'));
  } catch (ex) {
    console.error('db error', ex);
  }
  process.on('SIGINT', () => {
   console.log('SIGINT called...');
    mongoose?.connection?.close(() => {
      process.exit(0);
    });
  });
  mongoose.connection.on('disconnected', function () {
    console.error('DB Disconnected..');
  });
};

export default connectDB;
