export default  {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Final Challenge - Car Rental",
			version: "1.0.0",
			description: "Back-end Journey (Node.js) - AWS Cloud Context - second challenge car rental API",
		},
		servers: [
			{
				url: "http://localhost:8000",
			},
		],
	},
	apis: [
    '**/*.ts',
]
};

