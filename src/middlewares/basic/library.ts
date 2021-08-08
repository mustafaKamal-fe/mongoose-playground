import { Request, RequestHandler, Response } from 'express';
import User from '../../models/basic/user';
import BlogPost from '../../models/basic/post';

const addUser: RequestHandler = async (req: Request, res: Response) => {
	try {
		const { name } = req.body;

		const user = await User.create({ name });
		await user.save();

		res.status(201);
		res.end();
	} catch (e: any) {
		res.json({ error: e });
		res.status(400);
		res.end();
	}
};

const addPost: RequestHandler = async (req: Request, res: Response) => {
	try {
		const { title, author } = req.body;
		const post = await BlogPost.create({ title, author });
		await post.save();

		res.status(201);
		res.end();
	} catch (e) {
		res.json({ error: e });
		res.status(400);
		res.end();
	}
};

const getUserPosts: RequestHandler = async (req: Request, res: Response) => {
	try {
		const { user } = req.query;

		let posts = await User.findById(user).populate('posts').lean().exec();
		res.json({ posts });
		res.status(200);
		res.end();
	} catch (e: any) {
		res.status(400);
		res.json({ error: e.message });
		res.end();
	}
};
export default {
	addPost,
	addUser,
	getUserPosts,
};
