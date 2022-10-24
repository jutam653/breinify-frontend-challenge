import { useState } from 'react';
import ProductCard from './ProductCard';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

export default function Cards({ cards, query, deleteCard, editCard}) {
  const [ascending, setAscending] = useState(false);

  const toggleAscending = () => {
    setAscending(prevState => !prevState);
  };

  return (
    <>
      <Button onClick={toggleAscending} className='m-2'>Sort</Button>
      {ascending ?
        <Row className='mx-auto'>
        {cards.filter(card => card.productName.includes(query.toLowerCase())).sort((a, b) => new Date(a.creationTime) - new Date(b.creationTime)).map(data =>
          <ProductCard data={data} deleteCard={deleteCard} editCard={editCard}/>
        )}
        </Row>
        :
        <Row className='mx-auto'>
        {cards.filter(card => card.productName.includes(query.toLowerCase())).sort((a, b) => new Date(b.creationTime) - new Date(a.creationTime)).map(data =>
          <ProductCard data={data} deleteCard={deleteCard} editCard={editCard}/>
        )}
        </Row>
      }
    </>
  )
}