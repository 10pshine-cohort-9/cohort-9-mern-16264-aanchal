
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

before(async () => {
  const testUri = process.env.MONGO_URI.replace('notesapp', 'notesapp_test');
  await mongoose.connect(testUri);
  await mongoose.connection.db.dropDatabase();
});

after(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});