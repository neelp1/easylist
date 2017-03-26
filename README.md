# Easy List

Simple list application.

## Usage

```
npm install
```

```
npm start
```

## mongodb

Create a mongodb container:
```
docker run -d -p 27017:27017 --name my-mongo mongo
```

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

Connect using node:
```
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/test");
```
