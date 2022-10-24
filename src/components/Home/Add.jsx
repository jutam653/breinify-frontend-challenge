import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export default function Add({ addCard }) {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    addCard(name, description);
    setShowModal(false);
  };

  const handleClose = () => setShowModal(false);
  const handleOpen = () => setShowModal(true);

  return (
    <>
      <Button onClick={handleOpen} className='ms-2'>Add a Card!</Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Card Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                required
                type='text'
                placeholder='product name'
                onChange={(event) => setName(event.target.value)}>
              </Form.Control>
            </Form.Group>
            <Form.Group className='mt-2'>
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                required
                type='text'
                placeholder='description'
                onChange={(event) => setDescription(event.target.value)}>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type='submit'
            onClick={handleSubmit}
            >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}