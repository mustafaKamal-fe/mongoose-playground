import express from 'express';
import bodyParser from 'body-parser';
import errorHandler from './utils/errorHandler';
import connectMongoose from './utils/connectMongoose';
import library from './middlewares/library';

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// connect to DB (default connection)
app.use(connectMongoose);

// app.post('/person', library.addPerson, (_req: Request, res: Response) => {
// 	res.status(201);
// 	res.end();
// });
// app.get('/person', library.getPerson);

// app.post('/book', library.addBook, (_req: Request, res: Response) => {
// 	res.status(201);
// 	res.end();
// });

// app.get('/book', library.getBook);

// app.post('/bookshop', library.addBookShop, (_req: Request, res: Response) => {
// 	res.status(201);
// 	res.end();
// });

app.get('/books', library.filterBooks);
app.get('/book/bookshop/name', library.filterBookByBookShopName);
// error handler
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server Started Listening at port ${PORT}`);
});
