import 'bootstrap/dist/css/bootstrap.min.css';
import fotoHome from './fotoHome.jpg';
import Foto from './cover.jpg'

function Cover() {
    return (
        <div className='d-flex justify-content-center align-items-center w-100'>
            <div className="container-fluid d-flex align-items-center vh-100 w-100 p-3">
                <div className="d-flex justify-content-center align-items-center">
                    <div className="col-md-6 d-flex justify-content-start align-items-center position-absolute">
                        <img src={fotoHome} className="img-fluid mb-4 mr-100" alt="Image" style={{ maxHeight: '20em', width: 'auto', marginLeft: '-10em',marginTop:'-3.5em' }} />
                    </div>  
                    <div className="col-md-6">
                        <div className=" custom-bg-color text-center p-4 rounded" style={{backgroundColor: '#E4E2D6'}}>
                            <h1 className="mb-4">HOTEL ME GUSTA</h1>
                            <p className="mx-5 mb-4">Step  into the vibrant pulse of Ibiza</p>
                            <p className="mx-5 mb-4">Nestled prominently in the heart of the city, our Hotel Me Gusta stands as a symbol of Ibiza’s rich history and its exciting future. Seamlessly blending contemporary sophistication with cherished customs, our seven-story sanctuary invites guests to savor the best of both worlds.</p>
                            <p className="mx-5 mb-4">We are dedicated to providing you with unmatched opulence infused with the spirit of Ibiza. Each member of our devoted team embodies this commitment, ensuring that every moment of your stay exudes hospitality, coziness, and genuine character.</p>
                            <p className="mx-5 mb-4">Embark on a journey with us in the heart of Ibiza, where the city’s illustrious past and lively present are alive in every aspect.</p>
                            <p className="mx-5 mb-4">Welcome to Hotel Me Gusta, where heritage, contemporary flair, and indulgence intersect.</p>
                            <button className="btn w-49 btn-block rounded-0 bg-#b07256 text-white bg-hover-transparent" style={{ backgroundColor: '#b07256', color: 'white'}}>SEE MORE</button>
                        </div>
                    </div>
                    <img src={Foto} className="img-fluid mb-4 mr-100" alt="Image" style={{ maxHeight: '20em', width: '14em', marginLeft: '-4em',marginRight:'-8em',marginTop:'7em' }} />
                </div>
            </div>
        </div>
    );
}


export default Cover;


