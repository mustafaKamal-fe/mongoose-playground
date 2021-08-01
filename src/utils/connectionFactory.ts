import mongoose from 'mongoose';

/**
 * Opens new connection (other than default mongoose connection) to db.
 * It has the ability to detect if connection is already open otherwise return a new one.
 * This heleper is used in cross-db-ref
 * @param db
 * @returns mongoose.Connection
 */
export default async function connectionFactory(db: string) {
	const URL = `mongodb://localhost:27017/${db}`;
	const config = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		maxPoolSize: 10,
		minPoolSize: 4,
		connectTimeoutMS: 5000,
		socketTimeoutMS: 3000,
		serverSelectionTimeoutMS: 10000,
		maxIdleTimeMS: 10000,
	};
	let dbs: string[] = mongoose.connections
		.filter((conn) => {
			// if no db, no active/open connection
			return conn.db && conn.db.databaseName;
		})
		.map((conn) => {
			return conn.db.databaseName;
		});

	// if connection is not open yet, create new one
	if (!dbs.includes(db)) {
		return await mongoose.createConnection(URL, config);
	} else {
		// if connection is already open, return it
		let connPosition = dbs.indexOf(db);

		let conn = mongoose.connections[connPosition];

		if (conn) {
			if (conn.readyState === 0 || conn.readyState === 3) {
				return await mongoose.createConnection(URL, config);
			}
		}

		return conn;
	}
}
