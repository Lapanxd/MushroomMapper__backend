# mushroomMapper_backend
Pour trouver le document qui contient le `name`pour trouver les informations d'un champignon.
``` 
db.mushrooms.findOne({ name: name })
```
***
Pour insérer dans le document `GeoPoints` un nouveau point. `new ObjectId` est la methode fournie par la bibliothèque MongoDB pour créer un nouvel identifiant unique.
```js
insertOne({ location: { type: "Point", coordinates: [lat, long] } , mushroom_id: new ObjectId(mushroomId) })
```
***
Cela va créer un index géospatial de type "2dsphere" sur le champ "location", permettant de faire des requêtes géospatiales telles que $geoNear.
```
db.geoPoints.createIndex({ location : "2dsphere" })
```
***
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
```
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