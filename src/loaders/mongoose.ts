import { Db } from 'mongodb';
import mongoose from 'mongoose';
import config from './../config/config';

export default async function (): Promise<Db> {
  const connection = await mongoose.connect(config.databaseURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  return connection.connection.db;
}
