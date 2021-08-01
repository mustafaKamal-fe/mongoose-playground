import express from 'express';
import bodyParser from 'body-parser';
import errorHandler from './utils/errorHandler';
import connectMongoose from './utils/connectMongoose';
import library from './middlewares/platformLibrary';

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// connect to DB (default connection)
app.use(connectMongoose);

// error handler
app.use(errorHandler);

// ADD platform
app.post('/platform', library.addPlatform);
app.post('/game', library.addGame);
app.get('/game', library.getGame);
app.listen(PORT, () => {
	console.log(`Server Started Listening at port ${PORT}`);
});
