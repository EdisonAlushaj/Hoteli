import './Header.css'
// import AboutUs from './About-us/about-us.jsx'

function Header() {
  return (
    <header className="App-header">

        <div className="logo">

        </div>

        <ul>
            <li><a href="#">Home</a></li>
            <li><a href="src/About-us/about-us.jsx">About</a></li>
            
            <li> 
                <div className="dropdown">
                    <p className="dropbtn">SERVICES	▼ </p>
                            
                    <div className="dropdown-content">
                        <a href="#">Restaurant</a>
                        <a href="#">Spa</a>
                        <a href="#">Sauna</a>
                        <a href="#">Gym</a>
                        <a href="#">Pool</a>
                        <a href="#">Activities</a>
                    </div>
                </div>
            </li> 
            <li><a href="Contact Us">Contact Us</a></li>
        </ul>

        <button id="booking-btn">BOOK NOW</button>
    </header>
  );
}

export default Header;
