import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Menu.css';


function Menu() {
  return (
    <Container>
      <h1 className="text-center mt-5">Menu</h1>
      <Row className="mt-5">
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="food_item_1.jpg" />
            <Card.Body>
              <Card.Title>Seafood Paella</Card.Title>
              <Card.Text>
                Traditional Spanish dish with a variety of fresh seafood and rice.
              </Card.Text>
              <Card.Text className="text-muted">$18.99</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="food_item_2.jpg" />
            <Card.Body>
              <Card.Title>Ibiza Sunset Salad</Card.Title>
              <Card.Text>
                Fresh salad with mixed greens, tomatoes, avocado, and a tangy citrus dressing.
              </Card.Text>
              <Card.Text className="text-muted">$12.99</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="food_item_3.jpg" />
            <Card.Body>
              <Card.Title>Sangria</Card.Title>
              <Card.Text>
                Classic Spanish beverage made with red wine, chopped fruit, and a splash of brandy.
              </Card.Text>
              <Card.Text className="text-muted">$8.99</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Menu;
