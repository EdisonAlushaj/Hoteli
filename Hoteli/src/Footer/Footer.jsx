import 'bootstrap/dist/css/bootstrap.min.css';
import ExternalCSS from '../externalCSS';

function Footer() {
    return (
        <footer className="bg-dark text-light py-5 mt-auto" style={{marginTop:'2em'}}> 
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h4 className="mb-4 text-white" style={{fontSize: "2em", fontFamily: 'Roboto Slab, serif'}}>Hotel Me Gusta</h4>
                        <ul className="list-unstyled">
                            <li><p className="text-secondary">About Us</p></li>
                            <li><p className="text-secondary">Rooms</p></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h4 className="mb-4" style={{fontSize: "2em", fontFamily: 'Roboto Slab, serif'}}>Contact us</h4>
                        <ul className="list-unstyled">
                            <li><p className="text-secondary">info@hoteli.com</p></li>
                            <li><p className="text-secondary">+44 10 3443 9821</p></li>
                            <li><p className="text-secondary">+44 20 3453 4521</p></li>
                            <li><p className="text-secondary">Carrer de Sant Josep, 10, 07817 Sant Jordi de ses Salines, Ibiza, Spain</p></li>
                        </ul>
                    </div>

                    <div className="col-md-4">
                        <h4 className="mb-4" style={{fontSize: "2em", fontFamily: 'Roboto Slab, serif'}}>Socials</h4>
                        <div className="social-links">
                            <a href="#" className="text-white mx-4" ><i className="fab fa-facebook-f mr-3" style={{fontSize: "1.5em"}}></i></a>
                            <a href="#" className="text-white mx-4"><i className="fab fa-twitter mr-3" style={{fontSize: "1.5em"}}></i></a>
                            <a href="#" className="text-white mx-4"><i className="fab fa-instagram mr-3" style={{fontSize: "1.5em"}}></i></a>
                            <a href="#" className="text-white mx-4"><i className="fab fa-linkedin mr-3" style={{fontSize: "1.5em"}}></i></a>
                            <ExternalCSS/>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
