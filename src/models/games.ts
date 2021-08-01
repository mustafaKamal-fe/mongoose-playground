import dynamicSchemaBuilder from '../utils/dynamicSchemaBuilder';
import Platfrom from './platform';
import Rating from './ratings';

/**
 * This schema is weird BUT very dynamic. We need to use the model that is created from it to reference some
 * external (lives in another db, collection and connection) collection. This is cross-db-ref, That is, when we
 * say please use `ref: model`, here `model` is not a string. Rather, it is a `MODEL` that tells this schema,
 * If you want to reference and populate data from the external model, then here it is. This is different than
 * using population withtin the same database where we only need to say `ref: string` and use the string name
 * of the external model we would like to populate later.
 *
 *
 * See `dynamicSchemaBuilder` function to know how it works, but basically we call it here and we get a schema
 * with reference to some external model to use it in cross-db-ref
 *
 */
export default async function getGameSchema() {
	const gameSchema = await dynamicSchemaBuilder({
		refDbNames: [
			'mongoose-playground-platforms',
			'mongoose-playground-ratings',
		],
		refSchemaNames: ['Platform', 'Rating'],
		refSchemas: [Platfrom, Rating],
		originalSchemaPattern: {
			name: String,
			realease: Date,
		},

		pathNames: ['platforms', 'ratings'],
	});

	return gameSchema;
}
