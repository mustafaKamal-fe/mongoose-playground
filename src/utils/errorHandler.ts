import { NextFunction, Request, Response } from 'express';
/**
 * Custom error handler
 *
 * @param err
 * @param _req
 * @param res
 * @param _next
 */
const errorHandler = (
	err: any,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	console.log(err);
	res.json({ error: err.message });
};

export default errorHandler;
