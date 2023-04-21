const books = [
	{
		title: 'The Awakening',
		author: 'Kate Chopin',
	},
	{
		title: 'City of Glass',
		author: 'Paul Auster',
	},
	{
		title: 'Moby Dick',
		author: 'Herman Melville',
	},
	{
		title: 'Pizza',
		author: 'Mario',
	},
	{
		title: 'Book',
		author: 'Author',
	},
	{
		title: 'Amazing',
		author: 'Another Author',
	},
];

const resolvers = {
	Query: {
		books: () => books,
	},
};

export default resolvers;
