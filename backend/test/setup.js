const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

before(async () => {
  try {
    const testUri = process.env.MONGO_URI.replace('/?appName=Cluster0', '/notesapp_test?appName=Cluster0');
if (!testUri) throw new Error('TEST_MONGO_URI is not defined');
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