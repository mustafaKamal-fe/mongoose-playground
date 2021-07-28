import mongoose from 'mongoose';
import defaultSchemConfig from '../../utils/mongooseSchemaConfig';

const BookShopSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		location: { type: String, required: true },
		website: { type: String },
	},
	defaultSchemConfig({ withId: true })
);

const model =
	mongoose.models.person || mongoose.model('Bookshop', BookShopSchema);

export default model;
