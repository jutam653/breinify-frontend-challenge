import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function ProductCard({ data, deleteCard, editCard }) {
  const { productName, productImg, description, creationTime } = data;
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(productName);
  const [image, setImage] = useState(productImg);

  const date = new Date(creationTime);
  const localDate = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()} ${date.toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit'
	})}`;

  const toggleEdit = () => {
    setEdit(prevState => !prevState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const card = {
      productImg: image,
      oldProductName: productName,
      newProductName: name,
      description: description,
      creationTime: creationTime
    };
    editCard(card);
    toggleEdit();
  };

  return (
    <Col>
      <Card style={{ width: '15rem' }} className='m-2'>
        <Card.Img variant="top" src={productImg} />
        <Card.Body>
          {edit ?
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type='text'
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label className='mt-2'>Product Image URL</Form.Label>
                <Form.Control
                  type='url'
                  value={image}
                  onChange={(event) => setImage(event.target.value)}
                  required>
                </Form.Control>
              </Form.Group>
              <Button type='submit' className='mt-3'>Submit</Button>
            </Form>
            :
            <>
              <Card.Title>{productName}</Card.Title>
              <Card.Text>{description}</Card.Text>
              <Card.Text>{localDate}</Card.Text>
            </>
          }
        </Card.Body>
        {edit ? <></> :
          <Card.Footer>
            <Button onClick={() => deleteCard(data.productName)}>Delete</Button>
            <Button onClick={toggleEdit} className='m-2'>Edit</Button>
          </Card.Footer>
        }
      </Card>
    </Col>
  )
}