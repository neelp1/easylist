# Easy List

Simple list application.

## Usage
Start:
```
npm install
```
Test:
```
npm run start-db
```

## mongodb
### Create

Create a mongodb container:
```
docker run -d -p 27017:27017 --name my-mongo mongo
```

or restart stopped container:
```
docker start <container_id>
```

### Test
Start mongo bash:
```
docker exec -it my-mongo bash
mongo
```

Add and get data:
```
db.col.insert({"a":1})
db.col.find()
```
