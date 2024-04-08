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
            <Row className="d-flex justify-content-center mt-2">
            <Col md={{ span: 50, offset: 1}}>
              <h1 className="text-custom mb-5" style={{ fontSize: '4rem', fontFamily: 'Forum, sans-serif', color: '#b07256' }}>Contact Us</h1>
            </Col>
            <Col md={7}>
                    <div>
                        <h2 style={{ fontFamily: 'Forum, sans-serif' }}><b>FAQs and House Rules</b></h2>
                        <ul className="list-unstyled" style={{fontFamily: 'Forum, sans-serif', color: '#b07256'}}>
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
                            <li onClick={() => handleItemClick(6)} className="mb-3">
                                <strong>Is parking available at the Hotel?</strong>
                                <Badge bg={expandedItem === 6 ? 'danger' : 'success'} className="ms-2">{expandedItem === 6 ? '-' : '+'}</Badge>
                                {expandedItem === 6 && (
                                    <p className="mt-2">
                                        Yes, parking is available for guests. Additional charges may apply.
                                    </p>
                                )}
                            </li>
                            <li onClick={() => handleItemClick(7)} className="mb-3">
                                <strong>Are there any age restrictions for booking?</strong>
                                <Badge bg={expandedItem === 7 ? 'danger' : 'success'} className="ms-2">{expandedItem === 7 ? '-' : '+'}</Badge>
                                {expandedItem === 7 && (
                                    <p className="mt-2">
                                        Guests must be at least 18 years old to book a room.
                                    </p>
                                )}
                            </li>
                            <li onClick={() => handleItemClick(8)} className="mb-3">
                                <strong>Is smoking allowed in the rooms?</strong>
                                <Badge bg={expandedItem === 8 ? 'danger' : 'success'} className="ms-2">{expandedItem === 8 ? '-' : '+'}</Badge>
                                {expandedItem === 8 && (
                                    <p className="mt-2">
                                        Smoking is not permitted in the rooms. There are designated smoking areas available.
                                    </p>
                                )}
                            </li>
                            <li onClick={() => handleItemClick(9)} className="mb-3">
                                <strong>What amenities are provided in the rooms?</strong>
                                <Badge bg={expandedItem === 9 ? 'danger' : 'success'} className="ms-2">{expandedItem === 9 ? '-' : '+'}</Badge>
                                {expandedItem === 9 && (
                                    <p className="mt-2">
                                        Rooms are equipped with air conditioning, TV, minibar, and complimentary toiletries.
                                    </p>
                                )}
                            </li>
                            <li onClick={() => handleItemClick(10)} className="mb-3">
                                <strong>Is breakfast included in the room rate?</strong>
                                <Badge bg={expandedItem === 10 ? 'danger' : 'success'} className="ms-2">{expandedItem === 10 ? '-' : '+'}</Badge>
                                {expandedItem === 10 && (
                                    <p className="mt-2">
                                        Yes, breakfast is included in the room rate for all guests.
                                    </p>
                                )}
                            </li>
                            <li onClick={() => handleItemClick(5)} className="mb-3">
                                <strong>Pets</strong>
                                <Badge bg={expandedItem === 5 ? 'danger' : 'success'} className="ms-2">{expandedItem === 5 ? '-' : '+'}</Badge>
                                {expandedItem === 5 && (
                                    <p className="mt-2">
                                        Pets are allowed at the Hotel. You should pay extra for them!
                                    </p>
                                )}
                            </li>
                        </ul>
                    </div>
                </Col>
              <Col md={4} className='rounded p-4 bg-light' style={{ fontFamily: 'Forum, sans-serif', border: '1px solid #b07256' }}>
                    <h2 className='d-flex justify-content-center'><b>Write us a message</b></h2>
                    {submitSuccess && <p className="text-success">Thank you! Your message has been submitted successfully.</p>}
                    <Form className='d-flex justify-content-center align-items-center flex-column rounded p-4 ' noValidate validated={validated} onSubmit={handleSubmit} style={{ fontFamily: 'Forum, sans-serif', border:'1px solid #b07256' }}>
                        <Form.Group controlId="formName" className='w-100'>
                            <Form.Label><b>Name</b></Form.Label>
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

                        <Form.Group controlId="formEmail" className='w-100'>
                            <Form.Label><b>Email address</b></Form.Label>
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

                        <Form.Group controlId="formMessage" className='w-100'>
                            <Form.Label><b>Message</b></Form.Label>
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

                        <Button className="border-0 mt-2 w-50" style={{backgroundColor: '#b07256'}} type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Row className="mt-5">
    <Col className='d-flex justify-content-center align-items-center flex-column'>
        <h2 className="text-center mb-4"><b>Reach Us At Our Location</b></h2>
        <div className="embed-responsive" style={{ width: '100%', height: '400px' }}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1726.0121519441805!2d1.4181975561055582!3d38.89737299173805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x129945d2b0d133a9%3A0x188684245633ec93!2sHotel%20Torre%20del%20Mar!5e0!3m2!1sen!2s!4v1711833374804!5m2!1sen!2s" title="Hotel Location" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="embed-responsive-item" style={{ width: '100%', height: '100%', border: 'none' }}></iframe>
        </div>
        <p className="text-center"><b>Carrer de Sant Josep, 10, 07817 Sant Jordi de ses Salines, Ibiza, Spain</b></p>
    </Col>
</Row>

        </Container>
    );
};

export default Contact;
