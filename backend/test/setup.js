const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

before(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

after(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});