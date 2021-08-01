import { Request, Response } from 'express';
import connectionFactory from '../../utils/connectionFactory';
import platformSchema from '../../models/platform';
import getGameSchema from '../../models/games';
import Ratings from '../../models/ratings';
import modelFactory from '../../utils/modelFactory';

const addPlatform = async (req: Request, res: Response) => {
	try {
		const name = req.query.name;
		let db = await connectionFactory('mongoose-playground-platforms');

		if (db) {
			const platformModel = modelFactory(db, 'Platform', platformSchema);

			const doc = await platformModel.create({ name });
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

const addGame = async (req: Request, res: Response) => {
	try {
		const { name, platforms, realease, ratings } = req.body;

		let db = await connectionFactory('mongoose-playground-games');
		if (db) {
			let gameSchema = await getGameSchema();
			if (gameSchema) {
				const gameModel = modelFactory(db, 'Game', gameSchema);

				const doc = await gameModel.create({
					name,
					realease,
					mustafa: [...platforms, ...ratings],
				});
				await doc.save();
				res.status(201);
				res.json({ id: doc._id });
				res.end();
			}
		}
	} catch (e: any) {
		res.status(400);
		res.json({ error: e.toString() });
		res.end();
	}
};

const getGame = async (req: Request, res: Response) => {
	try {
		const id = req.query.id;
		const db = await connectionFactory('mongoose-playground-games');
		if (db) {
			let gameSchema = await getGameSchema();

			if (gameSchema) {
				const gameModel = modelFactory(db, 'Game', gameSchema);

				const doc = await gameModel
					.findById(id)
					.populate('modelName')
					.lean()
					.exec();

				res.status(200);
				res.json({ game: doc });
				res.end();
			}
		}
	} catch (e: any) {
		console.log(e);

		res.status(400);
		res.json({ error: e.toString() });
		res.end();
	}
};

const addRating = async (req: Request, res: Response) => {
	try {
		const name = req.body.name;

		let db = await connectionFactory('mongoose-playground-ratings');
		if (db) {
			const ratingModel = modelFactory(db, 'Rating', Ratings);
			const doc = await ratingModel.create({ name });
			await doc.save();
			res.status(201);
			res.json({ id: doc._id });
			res.end();
		}
	} catch (e: any) {
		res.status(400);
		res.json({ error: e.message });
		res.end();
	}
};
export default {
	addPlatform,
	getGame,
	addGame,
	addRating,
};
