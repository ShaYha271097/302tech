import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI!;

if (!uri) {
  throw new Error("Thiếu MONGO_URI trong .env");
}

const options = {
  maxPoolSize: 10,
  minPoolSize: 0,
  maxIdleTimeMS: 60000,
  connectTimeoutMS: 10000,
  serverSelectionTimeoutMS: 10000,
};

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }

  clientPromise = global._mongoClientPromise;
} else {
  const client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;