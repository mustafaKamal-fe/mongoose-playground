import { NextFunction, Request, RequestHandler, Response } from 'express';
import Person from '../../models/basic/person';
import Book from '../../models/basic/book';
import BookShop from '../../models/basic/bookShop';
import Writer from '../../models/basic/writer';

const addBook: RequestHandler = async (
	req: Request,
	_res: Response,
	next: NextFunction
) => {
	try {
		const { writer, book } = req.body;

		let newBook = await Book.create({
			name: book.name,
			pDate: book.pDate,
			writer,
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

const addWriter: RequestHandler = async (
	req: Request,
	_res: Response,
	next: NextFunction
) => {
	const { person, books } = req.body;

	const doc = await Writer.create({ identity: person, books });
	await doc.save();

	next();
};

const getWriter: RequestHandler = async (req: Request, res: Response) => {
	const id = req.query.id;

	let doc = await Writer.findById(id)
		.populate({
			path: 'books',
			options: { lean: true },
		})
		.populate('identity')
		.lean()
		.exec();

	res.status(200);
	res.json({
		writer: doc,
		explination: `Writer is retrieved with books path populated to see writer's books. However, here we get all available books (No Limit)`,
	});
	res.end();
};

export default {
	addBook,
	addBookShop,
	addPerson,
	getBook,
	getPerson,
	addWriter,
	getWriter,
};
