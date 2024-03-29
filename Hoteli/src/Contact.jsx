import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Badge } from 'react-bootstrap';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [validated, setValidated] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [expandedItem, setExpandedItem] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            console.log('Form submitted:', formData);
            setSubmitSuccess(true);
        }

        setValidated(true);
    };

    const handleItemClick = (index) => {
        setExpandedItem(expandedItem === index ? null : index);
    };

    return (
        <Container className="contact-container">
            <Row className="d-flex justify-content-center mt-5">
              <h1>Contact Us</h1>
            <Col md={6}>
                    <div>
                        <h2 style={{ fontFamily: 'Forum, sans-serif' }}>FAQs and House Rules</h2>
                        <ul className="list-unstyled">
                            <li onClick={() => handleItemClick(1)} className="mb-3">
                                <strong>What are the check-in and check-out times at the Hotel?</strong>
                                <Badge bg={expandedItem === 1 ? 'danger' : 'success'} className="ms-2">{expandedItem === 1 ? '-' : '+'}</Badge>
                                {expandedItem === 1 && (
                                    <p className="mt-2">
                                        Check-in: 2:00 PM, Check-out: 12:00 PM
                                    </p>
                                )}
                            </li>
                            <li onClick={() => handleItemClick(2)} className="mb-3">
                                <strong>Children & Extra Beds</strong>
                                <Badge bg={expandedItem === 2 ? 'danger' : 'success'} className="ms-2">{expandedItem === 2 ? '-' : '+'}</Badge>
                                {expandedItem === 2 && (
                                    <p className="mt-2">
                                        Children under 12 stay free. Extra beds available upon request.
                                    </p>
                                )}
                            </li>
                            <li onClick={() => handleItemClick(3)} className="mb-3">
                                <strong>Does the Hotel have a restaurant?</strong>
                                <Badge bg={expandedItem === 3 ? 'danger' : 'success'} className="ms-2">{expandedItem === 3 ? '-' : '+'}</Badge>
                                {expandedItem === 3 && (
                                    <p className="mt-2">
                                        Yes, the Hotel has a restaurant serving international cuisine.
                                    </p>
                                )}
                            </li>
                            <li onClick={() => handleItemClick(4)} className="mb-3">
                                <strong>How far is the Hotel from the center of Ibiza?</strong>
                                <Badge bg={expandedItem === 4 ? 'danger' : 'success'} className="ms-2">{expandedItem === 4 ? '-' : '+'}</Badge>
                                {expandedItem === 4 && (
                                    <p className="mt-2">
                                        The Hotel is approximately 2 kilometers from the center of Ibiza.
                                    </p>
                                )}
                            </li>
                            <li onClick={() => handleItemClick(5)} className="mb-3">
                                <strong>Pets</strong>
                                <Badge bg={expandedItem === 5 ? 'danger' : 'success'} className="ms-2">{expandedItem === 5 ? '-' : '+'}</Badge>
                                {expandedItem === 5 && (
                                    <p className="mt-2">
                                        Pets are allowed at the Hotel.
                                    </p>
                                )}
                            </li>
                        </ul>
                    </div>
                </Col>
              <Col md={6}>
                    <h2 style={{ fontFamily: 'Forum, sans-serif' }}>Write us a message</h2>
                    {submitSuccess && <p className="text-success">Thank you! Your message has been submitted successfully.</p>}
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group controlId="formName" as={Col} md={6}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="name" 
                                placeholder="Enter your name" 
                                value={formData.name} 
                                onChange={handleChange} 
                                required 
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid name.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formEmail" as={Col} md={6}>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                                type="email" 
                                name="email" 
                                placeholder="Enter your email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                required 
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid email.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formMessage" as={Col} md={6}>
                            <Form.Label>Message</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3} 
                                name="message" 
                                value={formData.message} 
                                onChange={handleChange} 
                                required 
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a message.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Contact;
