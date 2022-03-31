import { useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap"


export const Footer = () => {

    const navigate = useNavigate();

    return (
        <footer className="row row-cols-4 py-5 mt-auto border-top d-flex justify-content-around align-items-center animate__animated animate__fadeIn" style={{ "backgroundColor": "#003580", "overflow": "hidden", "padding": "0", "margin": "0" }}>

            <div className="col-12 col-lg-4 mb-5 mb-lg-0">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <Image
                        src="/assets/BARON.png"
                        alt="logo"
                        style={{ "cursor": "pointer", "maxWidth": "40%" }}
                        onClick={() => navigate("/")}
                        fluid
                    />
                </div>
            </div>

            <div className="col-4 col-lg-2 d-flex flex-column justify-content-center align-items-center">
                <h5>Documentación</h5>
                <ul className="nav flex-column">
                    <li className="nav-item mb-2"><a href="https://github.com/carlosbarondev/travel-booking-backend" className="nav-link p-0 linkFooter text-muted">Backend</a></li>
                    <li className="nav-item mb-2"><a href="https://github.com/carlosbarondev/travel-booking-frontend" className="nav-link p-0 linkFooter text-muted">Frontend</a></li>
                </ul>
            </div>

            <div className="col-4 col-lg-2 d-flex flex-column justify-content-center align-items-center">
                <h5>Contacto</h5>
                <ul className="nav flex-column">
                    <li className="nav-item mb-2"><a href="mailto:carlosbarondev@gmail.com" className="nav-link p-0 linkFooter text-muted">Correo</a></li>
                    <li className="nav-item mb-2"><a href="https://github.com/carlosbarondev" className="nav-link p-0 linkFooter text-muted">GitHub</a></li>
                </ul>
            </div>

            <div className="col-12 col-lg-4 mt-5 mt-sm-0">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <a className="linkFooter text-muted" href="https://github.com/carlosbarondev">carlosbarondev &copy; 2022</a>
                </div>
            </div>

        </footer>
    )
}