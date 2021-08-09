import mongoose from 'mongoose';
import connectionFactory from '../utils/connectionFactory';

/**
 *
 * Return model after connecting to dedicated databse using different
 * connection other than default mongoose connection. So we first create connection, then,
 * register model on it and finally return it
 * See multiple connections in the docs
 */
export default async function createBandSchema() {
	const BandSchema = new mongoose.Schema({
		name: String,
		members: {
			type: Map,
			of: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'celebrity',
			},
		},
	});
	const conn = await connectionFactory('mongoose-playground-music');

	if (conn) {
		return conn.models.band || conn.model('band', BandSchema);
	}
}
