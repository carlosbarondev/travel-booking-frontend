import { useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap"

export const Footer = () => {

    const navigate = useNavigate();

    return (
        <footer className="row row-cols-4 py-5 mt-auto border-top d-flex justify-content-around align-items-center animate__animated animate__fadeIn" style={{ "backgroundColor": "#003580", "overflow": "hidden", "padding": "0", "margin": "0", "color": "white" }}>

            <div className="col-12 col-lg-4 mb-5 mb-lg-0">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <Image
                        src="/assets/logo.png"
                        alt="logo"
                        style={{ "height": "70px", "cursor": "pointer" }}
                        onClick={() => navigate("/")}
                        fluid
                    />
                    <Image
                        src="/assets/big_logo.png"
                        alt="big_logo"
                        style={{ "height": "55px", "cursor": "pointer" }}
                        onClick={() => navigate("/")}
                        fluid
                    />
                </div>
            </div>

            <div className="col-4 col-lg-2 d-flex flex-column justify-content-center align-items-center">
                <h5><strong>Documentación</strong></h5>
                <ul className="nav flex-column">
                    <li className="nav-item mb-2"><a href="https://github.com/carlosbarondev/travel-booking-backend" className="nav-link p-0 linkFooter">Backend</a></li>
                    <li className="nav-item mb-2"><a href="https://github.com/carlosbarondev/travel-booking-frontend" className="nav-link p-0 linkFooter">Frontend</a></li>
                </ul>
            </div>

            <div className="col-4 col-lg-2 d-flex flex-column justify-content-center align-items-center">
                <h5><strong>Contacto</strong></h5>
                <ul className="nav flex-column">
                    <li className="nav-item mb-2"><a href="mailto:carlosbarondev@gmail.com" className="nav-link p-0 linkFooter">Correo</a></li>
                    <li className="nav-item mb-2"><a href="https://github.com/carlosbarondev" className="nav-link p-0 linkFooter">GitHub</a></li>
                </ul>
            </div>

            <div className="col-12 col-lg-4 mt-5 mt-sm-0">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <a className="linkFooter" href="https://github.com/carlosbarondev"><strong>carlosbarondev &copy; 2022</strong></a>
                </div>
            </div>

        </footer>
    )
}