import './Footer.css'

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="footer-col">
                        <h4>Hotel </h4>
                        <ul>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Privacy/Policy</a></li>
                            <li><a href="#"></a></li>
                            <li><a href="#"></a></li>

                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Contact us</h4>
                        <ul>
                            <li><a href="#">info@hoteli.com</a></li>
                            <li><a href="#">+44 10 3443 9821</a></li>
                            <li><a href="#">+44 20 3453 4521</a></li>
                            <li><a href="#">Carrer de Sant Josep, 10, 07817 Sant Jordi de ses Salines, Ibiza, Spain</a></li>
                        
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Socials </h4>
                        <div className="social-links">
                            <a href="#"><i className="fab fa-facebook-f"></i></a>
                            <a href="#"><i className="fab fa-twitter"></i></a>
                            <a href="#"><i className="fab fa-instagram"></i></a>
                            <a href="#"><i className="fab fa-linkedin"></i></a>

                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
  }
  
  export default Footer;