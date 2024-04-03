import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Menu.css';
import Slider from '/src/Menu/sliderimenu.jsx'; 
import MenuCoffee from '/src/Menu/menucoffe.jsx';
import MenuDrinks from '/src/Menu/menudrinks.jsx';
import MenuFood from '/src/Menu/menufood.jsx';
import Reservation from './Reservation.jsx';

function Menu() {
  const [showReservation, setShowReservation] = useState(false);
  const [activeMenu, setActiveMenu] = useState(<MenuFood />);

  const handleMenuChange = (index) => {
    switch (index) {
      case 0:
        setActiveMenu(<MenuFood />);
        break;
      case 1:
        setActiveMenu(<MenuDrinks />);
        break;
      case 2:
        setActiveMenu(<MenuCoffee />);
        break;
      default:
        break;
    }
  };

  const toggleReservation = () => {
    setShowReservation(!showReservation);
  };

  return (
    <>
      <Slider onMenuChange={handleMenuChange} />
      <Container fluid style={{ backgroundColor: '#f6f5dc' }}>
        <Row>{activeMenu}</Row>
        <Row className="mt-5">
          <Col>
            {/* Reservation Button */}
            <Button variant="info" onClick={toggleReservation}>
              Make Reservation
            </Button>
            {showReservation && <Reservation />}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Menu;
