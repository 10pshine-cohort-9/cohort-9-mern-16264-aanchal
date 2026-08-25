const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

before(async () => {
  try {
    const testUri = process.env.MONGO_URI.replace('/?appName=Cluster0', '/notesapp_test?appName=Cluster0');
    const dbName = new URL(testUri).pathname.slice(1).split('?')[0];
    if (dbName !== 'notesapp_test') {
      throw new Error(`Refusing to use non-test database: ${dbName}`);
    }
    await mongoose.connect(testUri);
    await mongoose.connection.db.dropDatabase();
  } catch (error) {
    throw new Error(`Test setup failed: ${error.message}`);
  }
});

after(async () => {
  try {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  } catch (error) {
    throw new Error(`Test teardown failed: ${error.message}`);
  }
});