import mongoose from 'mongoose';
import connectionFactory from '../utils/connectionFactory';
/**
 *
 * Return model after connecting to dedicated databse using different
 * connection other than default mongoose connection. So we first create connection, then,
 * register model on it and finally return it
 * See multiple connections in the docs
 */
export default async function createCelebritySchema() {
	const celebritySchema = new mongoose.Schema({
		name: String,
	});
	const conn = await connectionFactory('mongoose-playground-music');

	if (conn) {
		return conn.models.celebrity || conn.model('celebrity', celebritySchema);
	}
}
