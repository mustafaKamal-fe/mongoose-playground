import { NextFunction, RequestHandler } from 'express';
import mongoose from 'mongoose';

/**
 * Establish mongoose default connection.
 *
 * @param _req
 * @param _res
 * @param next
 */
const connectMongoose: RequestHandler = async (
	_req,
	_res,
	next: NextFunction
) => {
	const DB_URL = `mongodb://localhost:27017/mongoose-playground?&ssl=false`;
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

export default connectMongoose;
