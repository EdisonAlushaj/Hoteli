import React, { useState, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Menu.css';
import Slider from '/src/Menu/sliderimenu.jsx'; 
import MenuCoffee from '/src/Menu/menucoffe.jsx';
import MenuDrinks from '/src/Menu/menudrinks.jsx';
import MenuFood from '/src/Menu/menufood.jsx';
import Reservation from './Reservation.jsx'; 
import rezervimimg from './reserviminew.jpg';

function Menu() {
  const [showReservation, setShowReservation] = useState(false);
  const [activeMenu, setActiveMenu] = useState(<MenuFood />);
  const reservationWrapperRef = useRef(null);

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
    if (!showReservation && reservationWrapperRef.current) {
    
      reservationWrapperRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <Slider onMenuChange={handleMenuChange} />
      <Container fluid style={{ backgroundColor: '#f6f5dc', position: 'relative' }}>
        <Row>{activeMenu}</Row>
        <img src={rezervimimg} alt="" style={{ width: '100%', height: '50em', objectFit: '' }} />
        <Button onClick={toggleReservation} style={{ 
          position: 'relative', 
          bottom: '13em', 
          left: '50%', 
          transform: 'translateX(-50%)', 
          zIndex: 1,
          backgroundColor: 'transparent', 
          color: '#b07256',  
          fontFamily:  'Roboto Slab, serif',
          borderColor: 'transparent',
          fontSize: '35px',
          transition: 'color 0.3s', 
          cursor: 'pointer' 
        }}>
          Reserve a Table
        </Button>
        <div ref={reservationWrapperRef}> 
          {showReservation && <Reservation />}
        </div>
      </Container>
    </>
  );
}

export default Menu;
