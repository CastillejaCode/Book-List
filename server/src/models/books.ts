import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
	title: String,
	author: String,
	rating: Number,
	review: String,
	date: Number,
	uid: String,
	coverNumber: Number,
	read: Boolean,
});

bookSchema.set('toJSON', {
	transform: (_document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

export const Book = mongoose.model('Book', bookSchema);
