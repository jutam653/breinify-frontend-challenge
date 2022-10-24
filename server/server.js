import express from 'express';
import bodyParser from 'body-parser';
import redis from 'redis';

/**
 * Connect to redis
 */
const client = redis.createClient();
await client.connect();
client.on('connect', function (err) {
	if (err) {
		console.log('Could not establish a connection with Redis. ' + err);
	} else {
		console.log('Connected to Redis successfully!');
	}
});

const app = express();
const port = 5001;

const getAllCards = async () => {
	const { keys } = await client.scan(0, 'MATCH *card*');
	const cards = [];
	for (let key of keys) {
		const value = await client.get(key);
		cards.push(JSON.parse(value));
	}
	return cards;
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('In the server');
});

// GET
app.get('/getCards', async (req, res) => {
	const cards = await getAllCards();
	console.log(cards);
	res.status(200).send(cards);
});

// POST
app.post('/postCard', async (req, res) => {
	const { productName } = req.body;
	console.log(req.body);
	console.log(productName);
	const { keys } = await client.scan(0, 'MATCH *card*');
	if (keys.includes(`card:${productName}`)) {
		res.status(404).send('Card already exists!');
	} else {
		await client.set(`card:${productName}`, JSON.stringify(req.body));
		const cards = await getAllCards();
		res.status(201).send({
			newCard: req.body,
			cards: cards
		 });
	}
});

// PUT
app.put('/editCard', async (req, res) => {
	const { productImg, oldProductName, newProductName, description, creationTime } = req.body;
	const card = {
		productImg,
		productName: newProductName,
		description,
		creationTime
	}
	await client.rename(`card:${oldProductName}`, `card:${newProductName}`);
	await client.set(`card:${newProductName}`, JSON.stringify(card));
	const cards = await getAllCards();
	res.status(201).send({
		edited: req.body,
		cards: cards
	});
});

// DELETE
app.delete('/deleteCard', async (req, res) => {
	const { productName } = req.query;
	const deleted = await client.get(`card:${productName}`);
	await client.del(`card:${productName}`);
	const cards = await getAllCards();
	res.status(200).send({
		deleted: JSON.parse(deleted),
		cards: cards
	});
});


app.listen(port, () => console.log(`Running on port: ${port}`));
