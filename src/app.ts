import express from 'express';
import bodyParser from 'body-parser';
import errorHandler from './utils/errorHandler';
import connectMongoose from './utils/connectMongoose';
// import library from './middlewares/platformLibrary';

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// connect to DB (default connection)
app.use(connectMongoose);

// error handler
app.use(errorHandler);

/**
 * SEE DISSCUSSION ON HOW TO USE THIS FEATURE [https://github.com/Automattic/mongoose/issues/7967]
 */

// ADD platform
// app.post('/platform/multi/withref', library.addPlatform);
// app.post('/game/multi/withref', library.addGame);
// app.get('/game/multi/withref', library.getGame);
// app.post('/ratings/multi/withref', library.addRating);
app.listen(PORT, () => {
	console.log(`Server Started Listening at port ${PORT}`);
});
