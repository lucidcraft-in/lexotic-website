
'use client'
import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const PaymentModal = ({ show, handleClose, handlePaymentSubmit }) => {
  const [paymentMethod, setPaymentMethod] = useState('COD'); // Default to COD

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePaymentSubmit(paymentMethod);
    handleClose(); // Close modal after payment method is submitted
  };

  return (
    <Modal show={show} onHide={handleClose}>
        <h1>hhhhhhhhhhhhh</h1>
      {/* <Modal.Header closeButton>
        <Modal.Title>Select Payment Method</Modal.Title>
      </Modal.Header> */}
      {/* <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Select a payment option:</Form.Label>
            <div className="mb-3">
              <Form.Check 
                type="radio" 
                id="cod" 
                label="Cash on Delivery (COD)" 
                value="COD" 
                name="paymentMethod" 
                checked={paymentMethod === 'COD'} 
                onChange={() => setPaymentMethod('COD')} 
              />
              <Form.Check 
                type="radio" 
                id="online" 
                label="Online Payment" 
                value="Online" 
                name="paymentMethod" 
                checked={paymentMethod === 'Online'} 
                onChange={() => setPaymentMethod('Online')} 
              />
            </div>
          </Form.Group>
          <Button variant="primary" type="submit">
            Proceed with {paymentMethod === 'COD' ? 'COD' : 'Online Payment'}
          </Button>
        </Form>
      </Modal.Body> */}
    </Modal>
  );
};

const Checkout = () => {
  const [showModal, setShowModal] = useState(false);

  const handlePaymentSubmit = (method) => {
    if (method === 'COD') {
      // Handle Cash on Delivery logic
      console.log('Order placed with COD');
    } else if (method === 'Online') {
      // Handle Online Payment logic
      console.log('Proceed to Online Payment');
      // Integration with payment gateway logic here
    }
  };

  return (
    <>
      {/* Checkout button triggers modal */}
      <Button variant="success" onClick={() => setShowModal(true)}>
        Checkout
      </Button>

      {/* Payment Modal */}
      <PaymentModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handlePaymentSubmit={handlePaymentSubmit}
      />
    </>
  );
};

export default Checkout;
