import mongoose from 'mongoose';
import connectionFactory from './connectionFactory';
import modelFactory from './modelFactory';

interface SchemaBuilder {
	refDbName: string;
	refSchemaName: string;
	refSchema: mongoose.Schema;
	originalSchemaPattern: any;
	pathName: string;
}
/**
 *
 * ## Params:
 * - config
 *  ```ts
 *  refDbName:string, // db of external collection we want to refer to and populate
 *	refSchemaName:string, // schema name of of external collection we want to refer to and populate
 *	refSchema:mongoose.Schema, // schema object of of external collection we want to refer to and populate
 *	originalSchemaPattern:any, // schema shape of the collection we are about to build
 *	pathName:string // path name that will refer to the external schema and include populated data
 *  ```
 * ## Returns
 *  - `mongoose.Schema`
 *
 */
async function dynamicSchemaBuilder(config: SchemaBuilder) {
	const {
		refDbName,
		refSchemaName,
		refSchema,
		originalSchemaPattern,
		pathName,
	} = config;
	// connect to external model db
	const conn = await connectionFactory(refDbName);

	if (conn) {
		// build external model from it's schema
		const refModel = modelFactory(conn, refSchemaName, refSchema);
		// attach external model to `ref` path for later population
		originalSchemaPattern[pathName] = [
			{ type: mongoose.Schema.Types.ObjectId, ref: refModel },
		];

		// build final schema that is used in cross-db-ref
		const gameSchema = new mongoose.Schema(originalSchemaPattern);

		// schema returned has `ref` prop = model
		return gameSchema;
	}
}
export default dynamicSchemaBuilder;
