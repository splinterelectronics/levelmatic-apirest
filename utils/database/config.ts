import mongoose from 'mongoose';

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

const dbConnection = async () => {
  try {
    await mongoose.connect(<string>process.env.DB_CN, options);
    console.log('db online');
  } catch (err) {
    console.log(err);
  }
};

export default dbConnection;
