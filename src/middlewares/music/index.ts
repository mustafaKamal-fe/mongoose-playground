import { Request, Response } from 'express';
import createCelebritySchema from '../../models/celeb';
import createBandSchema from '../../models/band';

const addCelebrity = async (req: Request, res: Response) => {
	try {
		const name = req.query.name;
		// build celebrityModel from its schema using another connection (not default)
		const celebrityModel = await createCelebritySchema();
		if (celebrityModel) {
			const doc = await celebrityModel.create({ name });
			await doc.save();
			res.status(201);
			res.json({ id: doc._id });
			res.end();
		}
	} catch (e: any) {
		res.status(400);
		res.json({ error: e.toString() });
		res.end();
	}
};

const addBand = async (req: Request, res: Response) => {
	try {
		const { name, members } = req.body;

		// build bandModel from its schema using another connection (not default)
		const bandModel = await createBandSchema();
		if (bandModel) {
			// Create doc with empty path members
			const doc = await bandModel.create({ name, members: {} });
			// this path must become a map later (Schema implies that)
			members.forEach((member: string, i: number) => {
				// set map entries
				// mongoose only accept string keys for maps
				doc.members.set(String(i), member);
			});
			await doc.save();
			res.status(201);
			res.json({ id: doc._id });
			res.end();
		}
	} catch (e: any) {
		res.status(400);
		res.json({ error: e.toString() });
		res.end();
	}
};

const getBand = async (req: Request, res: Response) => {
	try {
		const id = req.query.id;
		// schemas are exported for dedicated conn and databse
		// we need them both converted into working models first
		// so we can query one (bandModel) and populate from the other (celebModel)
		const bandModel = await createBandSchema();
		const celebModel = await createCelebritySchema();
		if (bandModel && celebModel) {
			const doc = await bandModel
				.findById(id)
				.populate('members.$*') // special mongoose syntax: Look for every key in this map
				.exec();

			res.status(200);
			res.json({ band: doc });
			res.end();
		}
	} catch (e: any) {
		console.log(e);

		res.status(400);
		res.json({ error: e.toString() });
		res.end();
	}
};

export default { addCelebrity, addBand, getBand };
