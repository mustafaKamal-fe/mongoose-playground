import mongoose from 'mongoose';
const rating = new mongoose.Schema({
	name: { type: String },
});

export default rating;
