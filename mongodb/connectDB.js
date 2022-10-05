const mongoose = require('mongoose');

const connection = {};

async function connectDB(URI) {
  if (connection.isConnected) {
    // eslint-disable-next-line no-useless-return
    return;
  }

  try {
    const db = await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    connection.isConnected = db.connections[0].readyState;

    // eslint-disable-next-line no-console
    console.log('MongoDB Connection status:', connection.isConnected);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('MongoDB Connection error:', error);
  }
}

module.exports = connectDB;
