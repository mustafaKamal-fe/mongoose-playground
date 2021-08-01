import mongoose from 'mongoose';

/**
 * Schema here is exported using Schema pattern. The reason is we are going to refer to it from another
 * collections, That are, living in another databse (cross-db-refs). In other words, this schema is Db-agnostic
 * we do not excplicitly bind it to one connection only (say it default connection or any custom connection).
 * Later, this schema is going to be translated into a model for a specific mongoose connection (db) using
 * `modelFactory` function.
 */
const platformSchema = new mongoose.Schema({
	name: String,
});

export default platformSchema;
