# mushroomMapper
Pour la map à coin à champignons nous avons utilisés une base de donnée MongoDB composée de 3 collections : `mushrooms`, `geoPoints` et `cities`. Les document mushrooms se présentent sous cette forme : 
```js 
{
  "_id": {
    "$oid": "642be2a442166cc93f52c283"
  },
  "name": "Cèpe de Bordeaux",
  "description": "Le cèpe de Bordeaux est un champignon comestible très prisé en cuisine française, connu pour son arôme boisé et sa saveur délicate.",
  "image": "https://v2s7b3y2.rocketcdn.me/wp-content/uploads/2022/04/Cepe-de-Bordeaux-Boletus-edulis.jpg"
}
```

Les documents de geoPoints se présentent sous cette forme :
```js
{
  "_id": {
    "$oid": "643534f03152265a7b79bc46"
  },
  "location": {
    "type": "Point",
    "coordinates": [
      48.8566,
      2.3522
    ]
  },
  "mushroom_id": {
    "$oid": "642be2a442166cc93f52c284"
  }
}
```

Et la collection cities est une collection qu'on nous avons récupéré sur un repo github. Ses documents se présentent sous cette forme : 
```js
{
  "_id": {
    "$oid": "642be857846fd0c242542a1c"
  },
  "city": "Toulouse",
  "lat": "43.6045",
  "lng": "1.4440",
  "country": "France",
  "iso2": "FR",
  "admin_name": "Occitanie",
  "capital": "admin",
  "population": "968638",
  "population_proper": "486828"
}
```

Pour trouver le document qui contient le `name`pour trouver les informations d'un champignon.
```js
db.mushrooms.findOne({ name: name })
```
***
Voici la fonction JS qu'on a utilisé pour insérer dans le document `GeoPoints` un nouveau point. `new ObjectId` est la methode fournie par la bibliothèque MongoDB pour créer un nouvel identifiant unique.
```js
async create(mushroomId, lat, long){
      const client = await MongoClient.connect(url);
      const collection = client.db(dbName).collection(collectionName);
      const geoPoints = await collection.insertOne({ location: { type: "Point", coordinates: [lat, long] } , mushroom_id: new ObjectId(mushroomId) });
      client.close();
      return geoPoints;
}
```
***
Cela va créer un index géospatial de type "2dsphere" sur le champ "location", permettant de faire des requêtes géospatiales telles que $geoNear.
```js
db.geoPoints.createIndex({ location : "2dsphere" })
```
L'opérateur géospatial `$near` renvoie les documents qui sont géographiquement proche d'un point. Le `$maxdistance` défini le rayon autour du point.
```js
db.geoPoints.find({
  location: {
    $near: {
      $geometry: {
        type: "Point",
        coordinates: [43.64328051504386, 1.25518798828125]
      },
      $maxDistance: 20000
    }
  }
})
```
***
Pour définir ma `lat` et `lng` avec des variables 
```js
lat = parseFloat(db.cities.findOne({city: "Paris"}).lat)
lng = parseFloat(db.cities.findOne({city: "Paris"}).lng)
```

```js
db.geoPoints.find({
  location: {
    $near: {
      $geometry: {
        type: "Point",
        coordinates: [lat, lng]
      },
      $maxDistance: 20000
    }
  }
})
```
