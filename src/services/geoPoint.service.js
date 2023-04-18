import { MongoClient, ObjectId } from "mongodb";

const url = "mongodb://localhost:27017";
const dbName = "MushroomMapper";
const collectionName = "geoPoints";

class GeoPointService {

  async findAll(){
      const client = await MongoClient.connect(url);
      const collection = client.db(dbName).collection(collectionName);
      const geoPoints = await collection.find({}).toArray();
      client.close();
      return geoPoints;
  }

  async create(mushroomId, lat, long){
      const client = await MongoClient.connect(url);
      const collection = client.db(dbName).collection(collectionName);
      const geoPoints = await collection.insertOne({ location: { type: "Point", coordinates: [lat, long] } , mushroom_id: new ObjectId(mushroomId) });
      client.close();
      return geoPoints;
  }
}

export const geoPointService = new GeoPointService();
