import express from 'express';
import bodyParser from 'body-parser';
import errorHandler from './utils/errorHandler';
import connectMongoose from './utils/connectMongoose';
import nestedLibrary from './middlewares/nested/index';

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// connect to DB (default connection)
app.use(connectMongoose);

/**
 * Populate nested/multi-level paths
 */
app.get('/nested', nestedLibrary.getNestedUser);
app.post('/nested', nestedLibrary.createNestedUser);
app.patch('/nested', nestedLibrary.updateNestedUser);
// error handler
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server Started Listening at port ${PORT}`);
});
