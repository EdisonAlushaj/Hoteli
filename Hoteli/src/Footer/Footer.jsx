import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
    return (
        <footer className="bg-dark text-light py-5 mt-auto" style={{marginTop:'2em'}}> {/* Use mt-auto to push footer to the bottom */}
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h4 className="mb-4">Hotel</h4>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-white">About Us</a></li>
                            <li><a href="#" className="text-white">Privacy/Policy</a></li>
                            <li><a href="#" className="text-white"></a></li>
                            <li><a href="#" className="text-white"></a></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h4 className="mb-4">Contact us</h4>
                        <ul className="list-unstyled">
                            <li><a href="mailto:info@hoteli.com" className="text-white">info@hoteli.com</a></li>
                            <li><a href="tel:+441034439821" className="text-white">+44 10 3443 9821</a></li>
                            <li><a href="tel:+442034534521" className="text-white">+44 20 3453 4521</a></li>
                            <li><a href="#" className="text-white">Carrer de Sant Josep, 10, 07817 Sant Jordi de ses Salines, Ibiza, Spain</a></li>
                        </ul>
                    </div>

                    <div className="col-md-4">
                        <h4 className="mb-4">Socials</h4>
                        <div className="social-links">
                            <a href="#" className="text-white"><i className="fab fa-facebook-f mr-3"></i></a>
                            <a href="#" className="text-white"><i className="fab fa-twitter mr-3"></i></a>
                            <a href="#" className="text-white"><i className="fab fa-instagram mr-3"></i></a>
                            <a href="#" className="text-white"><i className="fab fa-linkedin mr-3"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
