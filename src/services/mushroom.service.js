import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";
const dbName = "MushroomMapper";
const collectionName = "mushrooms";

class MushroomService {
  async findAll() {
    const client = await MongoClient.connect(url);
    const collection = client.db(dbName).collection(collectionName);
    const mushrooms = await collection.find({}).toArray();
    client.close();
    return mushrooms;
  }

  async findByName(name){
    const client = await MongoClient.connect(url);
    const collection = client.db(dbName).collection(collectionName);
    const mushrooms = await collection.findOne({ name: name });
    client.close();
    return mushrooms;
  }
}

export const mushroomService = new MushroomService();
