import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Cards from './Cards';
import Add from './Add';
import axios from 'axios';

export function Home() {
	const [cards, setCards] = useState([]);
	const [query, setQuery] = useState('');

	useEffect(() => {
		axios.get('/getCards')
			.then(results => setCards(results.data))
			.catch(err => console.log(err));
	}, []);

	const addCard = async (name, description) => {
		const newCard = {};
		newCard.productImg = `https://source.unsplash.com/300x300/?${name}`;
		newCard.productName = name;
		newCard.description = description;
		newCard.creationTime = new Date();
		await axios.post('/postCard', newCard)
			.then(results => setCards(results.data.cards))
			.catch(err => alert(err.response.data));
	};

	const deleteCard = async (name) => {
		await axios.delete(`/deleteCard?productName=${name}`)
			.then(results => setCards(results.data.cards))
			.catch(err => console.log(err));
	};

	const editCard = async (card) => {
		await axios.put(`/editCard`, card)
			.then(results => setCards(results.data.cards))
			.catch(err => console.log(err));
	};

	return (
		<div>
			<h1>Breinify Challenge</h1>
			<Form>
				<Form.Control
					type='text'
					placeholder='search'
					onChange={(event) => setQuery(event.target.value)}
					className='mx-2'>
				</Form.Control>
			</Form>
			<Add addCard={addCard}/>
			<Cards
				cards={cards}
				query={query}
				deleteCard={deleteCard}
				editCard={editCard}
			/>
		</div>
	);
}
