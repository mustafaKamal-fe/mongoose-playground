import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import errorHandler from './utils/errorHandler';
import connectMongoose from './utils/connectMongoose';
import filterQueryLibrary from './middlewares/filters-query/library';
import basicPopulationLibrary from './middlewares/basic/library';

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// connect to DB (default connection)
app.use(connectMongoose);

/**
 * Basic population
 */

// PERSON
app.post(
	'/person',
	basicPopulationLibrary.addPerson,
	(_req: Request, res: Response) => {
		res.status(201);
		res.end();
	}
);
app.get('/person', basicPopulationLibrary.getPerson);

// BOOK
app.post(
	'/book',
	basicPopulationLibrary.addBook,
	(_req: Request, res: Response) => {
		res.status(201);
		res.end();
	}
);
app.get('/book', basicPopulationLibrary.getBook);

// WRITER
app.get('/writer', basicPopulationLibrary.getWriter);
app.post(
	'/writer',
	basicPopulationLibrary.addWriter,
	(_req: Request, res: Response) => {
		res.status(201);
		res.end();
	}
);
// BOOKSHOP
app.post(
	'/bookshop',
	basicPopulationLibrary.addBookShop,
	(_req: Request, res: Response) => {
		res.status(201);
		res.end();
	}
);

/**
 * Filtered population
 */
app.get('/books', filterQueryLibrary.filterBooks);
app.get('/book/bookshop/name', filterQueryLibrary.filterBookByBookShopName);

// error handler
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server Started Listening at port ${PORT}`);
});
