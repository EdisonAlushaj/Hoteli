import 'bootstrap/dist/css/bootstrap.min.css';

function Cover() {
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-light w-50 p-3">
            <div className="text-center p-4 rounded bg-#505050">
                <h1 className="mb-4">HOTEL</h1>
                <p className="mx-5 mb-4">Welcome to the heartbeat of Prishtina</p>
                <p className="mx-5 mb-4">Perched majestically in the center of the city, our hotel stands as a testament to Ibiza’s rich tapestry of history and its dynamic future. A seamless blend of modern elegance and cherished traditions, our seven-story haven invites guests to experience the best of both worlds.</p>
                <p className="mx-5 mb-4">Our commitment is to offer you unparalleled luxury with a touch of Ibiza’s soul. Every member of our dedicated team embodies this promise, ensuring that each moment of your stay is imbued with warmth, comfort, and authenticity.</p>
                <p className="mx-5 mb-4">Join us in the heart of Ibiza, and let us take you on a journey where the city’s storied past and vibrant present come alive in every detail.</p>
                <p className="mx-5 mb-4">Welcome to Derand Hotel, where tradition, modernity, and luxury converge.</p>
                <button className="btn btn-block rounded-0 bg-#b07256 text-white bg-hover-transparent" style={{ backgroundColor: '#b07256', color: 'white'}}>SEE MORE</button>
            </div>
        </div>
    );
}

export default Cover;

