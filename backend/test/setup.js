const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

before(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  
  await mongoose.connection.db.dropDatabase();
});

after(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});