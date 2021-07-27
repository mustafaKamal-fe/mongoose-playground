import { Request, RequestHandler, Response } from 'express';
import Book from '../../models/basic/book';
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

const filterBookByBookShopName: RequestHandler = async (
	req: Request,
	res: Response
) => {
	const { name } = req.query;
	console.log(name);

	let book = await Book.findOne({ 'bookshop.name': name })
		.populate('bookshop')
		.lean()
		.exec();

	res.status(200);
	res.json({
		book,
		message: `There is no way to filter documents on population path even when we populate the path itself. see https://mongoosejs.com/docs/populate.html#query-conditions`,
	});
	res.end();
};
export default {
	filterBooks,
	filterBookByBookShopName,
};
