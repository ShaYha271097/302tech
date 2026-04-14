import { MongoClient } from "mongodb"

const uri = process.env.MONGO_URI!

if (!uri) {
  throw new Error("Thiếu MONGO_URI trong .env")
}

const options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // ssl: true,
};  // Không cần phải chỉ định thêm options ở đây

let clientPromise: Promise<MongoClient>
let client: MongoClient;

  client = new MongoClient(uri, options);
  clientPromise = client.connect();

  
export default clientPromise;
