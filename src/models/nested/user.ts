import mongoose from 'mongoose';

const nestedSchema = new mongoose.Schema({
	name: String,
	friends: {
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
		default: undefined,
	},
});

const model = mongoose.models.user || mongoose.model('User', nestedSchema);

export default model;
