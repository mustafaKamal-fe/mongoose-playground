import { NextFunction, Request, Response } from 'express';
import User from '../../models/nested/user';

async function getNestedUser(req: Request, res: Response) {
	/**
	 * Notice population levels syntax here
	 */
	let user = await User.findOne({ name: req.body.name }).populate({
		path: 'friends',
		populate: { path: 'friends' },
	});
	res.status(200);
	res.json({
		user,
		explination: `We have populated nested levels of paths (friends of friends here) using the above syntax`,
	});
	res.end();
}

async function createNestedUser(req: Request, res: Response) {
	const name = req.body.name;
	await User.create({ name });
	res.status(201);
	res.end();
}

async function updateNestedUser(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const name = req.body.name;
		const friends = req.body.friends;
		let user = await User.findOne({ name });
		if (user.friends) {
			user.friends.push(...friends);
		} else {
			user.friends = [...friends];
		}
		await user.save();

		res.status(200);
		res.end();
	} catch (e) {
		next(e);
	}
}
export default { getNestedUser, createNestedUser, updateNestedUser };
