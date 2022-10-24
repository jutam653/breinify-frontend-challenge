import { useState } from 'react';
import ProductCard from './ProductCard';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

export default function Cards({ cards, query, deleteCard, editCard}) {
  const [ascending, setAscending] = useState(false);

  const toggleAscending = () => {
    setAscending(prevState => !prevState);
  };

  return (
    <>
      <Button onClick={toggleAscending} className='m-2'>Sort by Creation Time</Button>
      {ascending ?
        <Container fluid className='m-auto'>
          <Row>
            {cards.filter(card => card.productName.includes(query.toLowerCase())).sort((a, b) => new Date(a.creationTime) - new Date(b.creationTime)).map(data =>
              <ProductCard key={data.productName} data={data} deleteCard={deleteCard} editCard={editCard}/>
            )}
          </Row>
        </Container>
        :
        <Container fluid>
          <Row>
            {cards.filter(card => card.productName.includes(query.toLowerCase())).sort((a, b) => new Date(b.creationTime) - new Date(a.creationTime)).map(data =>
              <ProductCard key={data.productName} data={data} deleteCard={deleteCard} editCard={editCard}/>
            )}
          </Row>
        </Container>
      }
    </>
  )
}