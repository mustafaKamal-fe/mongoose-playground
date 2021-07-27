import { NextFunction, Request, RequestHandler, Response } from 'express';
import Person from '../../models/basic/person';
import Book from '../../models/basic/book';
import BookShop from '../../models/basic/bookShop';

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

export default {
	addBook,
	addBookShop,
	addPerson,
	getBook,
	getPerson,
};
