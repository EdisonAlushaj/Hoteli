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
                            <h1 className="mb-4">HOTEL</h1>
                            <p className="mx-5 mb-4">Welcome to the heartbeat of Prishtina</p>
                            <p className="mx-5 mb-4">Perched majestically in the center of the city, our hotel stands as a testament to Ibiza’s rich tapestry of history and its dynamic future. A seamless blend of modern elegance and cherished traditions, our seven-story haven invites guests to experience the best of both worlds.</p>
                            <p className="mx-5 mb-4">Our commitment is to offer you unparalleled luxury with a touch of Ibiza’s soul. Every member of our dedicated team embodies this promise, ensuring that each moment of your stay is imbued with warmth, comfort, and authenticity.</p>
                            <p className="mx-5 mb-4">Join us in the heart of Ibiza, and let us take you on a journey where the city’s storied past and vibrant present come alive in every detail.</p>
                            <p className="mx-5 mb-4">Welcome to Derand Hotel, where tradition, modernity, and luxury converge.</p>
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


