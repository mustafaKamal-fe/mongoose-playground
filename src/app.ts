import express, {
	NextFunction,
	Request,
	RequestHandler,
	Response,
} from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import Person from './models/person';
import Book from './models/book';

const app = express();
const PORT = 3000;
const DB_URL = `mongodb://localhost:27017/mongoose-playground?&ssl=false`;

const errorHandler = (
	err: any,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	console.log(err);
	res.json({ error: err.message });
};

const useMongoose: RequestHandler = async (_req, _res, next: NextFunction) => {
	try {
		await mongoose.connect(DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		next();
	} catch (e: any) {
		next(e.message);
	}
};

const addBook: RequestHandler = async (
	req: Request,
	_res: Response,
	next: NextFunction
) => {
	try {
		const { writer, book } = req.body;

		let doc = await Person.create({
			name: writer.name,
			age: writer.age,
		});

		await doc.save();

		let newBook = await Book.create({
			name: book.name,
			pDate: book.pDate,
			writer: doc._id,
		});

		await newBook.save();

		next();
	} catch (e: any) {
		next(e.message);
	}
};

const addPerson: RequestHandler = async (
	req: Request,
	_res: Response,
	next: NextFunction
) => {
	try {
		const { name, age } = req.body;

		let doc = await Person.create({
			name,
			age,
		});

		await doc.save();
	} catch (e: any) {
		next(e.message);
	}

	next();
};
const getBook: RequestHandler = async (
	req: Request & any,
	_res: Response,
	next: NextFunction
) => {
	try {
		const name = req.query.name;
		let doc = await Book.findOne({ name }).populate('writer').lean().exec();
		req.doc = doc;

		next();
	} catch (e: any) {
		next(e);
	}
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(useMongoose);

app.post('/book', addBook, (_req: Request, res: Response) => {
	res.status(201);
	res.end();
});

app.post('/person', addPerson, (_req: Request, res: Response) => {
	res.status(201);
	res.end();
});

app.get('/book', getBook, (req: Request & any, res: Response) => {
	res.json({ name: req.doc });
	res.status(200);
	res.end();
});

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server Started Listening at port ${PORT}`);
});
