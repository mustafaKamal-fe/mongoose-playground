import { NextFunction, Request, RequestHandler, Response } from 'express';
import Person from '../models/person';
import Book from '../models/book';
import BookShop from '../models/bookShop';

const addBook: RequestHandler = async (
	req: Request,
	_res: Response,
	next: NextFunction
) => {
	try {
		console.log(req.body);

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
			bookshop: book.bookshop,
		});

		await newBook.save();

		next();
	} catch (e: any) {
		next(e.message);
	}
};

const getBook: RequestHandler = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const id = req.query.id;
		const onlyName = req.query.onlyName === 'true' ? true : false;
		let book: any;

		if (onlyName) {
			book = await Book.findById(id)
				.populate('writer', 'name')
				.populate('bookshop')
				.lean()
				.exec();
		} else {
			book = await Book.findById(id)
				.populate('writer')
				.populate('bookshop')
				.lean()
				.exec();
		}

		res.json({ book });
		res.status(200);
		res.end();
	} catch (e: any) {
		next(e);
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

const getPerson: RequestHandler = async (req: Request, res: Response) => {
	const id = req.query.id;
	let person = await Person.findById(id).lean().exec();

	res.json({ person });
	res.status(200);
	res.end();
};

const addBookShop: RequestHandler = async (
	req: Request,
	_res: Response,
	next: NextFunction
) => {
	const { name, location, website } = req.body;

	const doc = await BookShop.create({ name, location, website });
	await doc.save();
	next();
};

const filterBooks: RequestHandler = async (req: Request, res: Response) => {
	const { location, website } = req.query;
	const match: any = { location, website };
	const query: any = {};

	// conditional query object
	for (const par in match) {
		if (par) query[par] = match[par];
	}

	let books = await Book.find()
		.populate({
			path: 'bookshop',
			match: query,
		})
		.lean()
		.exec();

	res.status(200);
	res.json({
		books,
		explaination: `
	Suppose document A has "ref" to document B. Generally, Document B can get populated like usual.
	However, If we would like to filter any query to Document A, like when you normally make a query 
	based on some condition such as "A.find({...conditions})", BUT, now we query using the population
	path as the filter like "A.find().populate({path: 'B', match: {...conditions}})". Then, we can not do that
	and THERE IS NO way to do so. If this query matches any, it will return the matched documents along with the
	populated data, offcourse. However, if non match, the populated path will be null (or []) and the rest is
	returned as if there is no query filter all together. see [https://mongoosejs.com/docs/populate.html#query-conditions]

	`,
	});
	res.end();
};
export default {
	getBook,
	getPerson,
	addPerson,
	addBook,
	addBookShop,
	filterBooks,
};
