import mongoose from 'mongoose';

const PersonSchema = new mongoose.Schema({
	name: String,
	age: Date,
});

const model = mongoose.models.person || mongoose.model('Person', PersonSchema);

export default model;
