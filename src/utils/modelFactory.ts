import mongoose from 'mongoose';
/**
 *
 * connects a model to any database. Used in cross-db-ref.
 * @param db
 * @param model
 * @param schema
 * @returns mongoose.Model
 */
export default function modelFactory(
	db: mongoose.Connection,
	model: string,
	schema: mongoose.Schema
) {
	const collection = db.models[model] || db.model(model, schema);

	return collection;
}
