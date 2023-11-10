import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
	title: String,
	author: String,
	rating: Number,
	read: Boolean,
	review: String,
	startDate: Date,
	endDate: Date,
	date: String,
	uid: String,
	coverNumber: Number,
});

bookSchema.set('toJSON', {
	transform: (_document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

export const Book = mongoose.model('Book', bookSchema);
