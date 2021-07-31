import { Request, RequestHandler, Response } from 'express';
import Writer from '../../models/basic/writer';

const getWriterWithSpesificBooks: RequestHandler = async (
	req: Request,
	res: Response
) => {
	console.log('LIMIT Route');

	const { id } = req.query;
	const { limit } = req.params;

	// Populated by limit value
	if (limit) {
		let doc = await Writer.findById(id)
			.populate({
				path: 'books',
				limit,
			})
			.populate('identity')
			.lean()
			.exec();

		res.status(200);
		res.json({
			writer: doc,
			explination: `Here we get populated documents for path books BUT with a limit we can set for the 
    number of documents to get. This is done with "limit" property set to NUMBER in
    the "options" property`,
		});
		res.end();
	}
};
const getWriterWithSpesificBooksPerDocument: RequestHandler = async (
	req: Request,
	res: Response
) => {
	console.log('Per Doc Route');
	const { id } = req.query;
	const { limit } = req.params;

	// Populated by limit values without leaving any doc see [https://mongoosejs.com/docs/populate.html#limit-vs-perDocumentLimit]
	if (limit) {
		let doc = await Writer.findById(id)
			.populate({
				path: 'books',
				perDocumentLimit: parseInt(limit),
			})
			.populate('identity')
			.lean()
			.exec();

		res.status(200);
		res.json({
			writer: doc,
			explination: `Here we get populated documents for path books BUT with a limit we can set for the 
    number of documents to get. This is done with "limit" property set to true in
    the "options" property`,
		});
		res.end();
	}
};

export default {
	getWriterWithSpesificBooks,
	getWriterWithSpesificBooksPerDocument,
};
