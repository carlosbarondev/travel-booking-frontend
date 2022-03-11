import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Image, Navbar } from "react-bootstrap"
import ReactRoundedImage from "react-rounded-image";

export const TopBar = () => {

    const navigate = useNavigate();

    const { name, uid, role, img } = useSelector(state => state.auth);

    return (
        <Navbar sticky="top" bg="light" style={{ "padding": "0", "margin": "0" }}>
            <Container className="d-flex align-items-center" style={{ "height": "55px" }} fluid>
                <Navbar.Brand className="ms-2 ms-md-4 me-4 me-md-5">
                    <Image
                        className="navbarDisableImg"
                        style={{ "height": "55px", "cursor": "pointer" }}
                        alt="logo"
                        src="/assets/logo_grande.png"
                        onClick={() => navigate("/")}
                    />
                    <Image
                        className="navbarEnableImg"
                        style={{ "height": "55px", "cursor": "pointer" }}
                        alt="logo"
                        src="/assets/logo.png"
                        onClick={() => navigate("/")}
                    />
                </Navbar.Brand>
                {
                    (!!uid &&
                        <div key="in" className="d-flex align-items-center h-100 hoverFondo me-md-4 px-2 px-md-3" style={{ "cursor": "pointer" }} onClick={() => navigate("/panel")}>
                            {
                                role === "USER_ROLE"
                                    ? img ? <ReactRoundedImage
                                        image={img ? img : "/assets/no-image.png"}
                                        roundedColor="#49c1e1"
                                        imageWidth="50"
                                        imageHeight="50"
                                        roundedSize="2"
                                        borderRadius="15"
                                    /> : <div><i className="fas fa-user" style={{ "fontSize": "30px" }}></i></div>
                                    : <i className="fa-solid fa-user-gear" style={{ "fontSize": "30px" }}></i>
                            }
                            <div className="navbarDisable ms-2">
                                <div style={{ "marginBottom": "-5px" }}>{`Hola ${name}`}</div>
                                {
                                    role === "USER_ROLE"
                                        ? <b>Mi Cuenta</b>
                                        : <b>Panel de Administración</b>
                                }
                            </div>
                        </div>
                    )
                    || (!uid &&
                        <div key="out" className="d-flex align-items-center h-100 hoverFondo me-md-4 px-2 px-md-3" style={{ "cursor": "pointer" }} onClick={() => navigate("/login")}>
                            <i className="fas fa-sign-in-alt" style={{ "fontSize": "30px" }}></i>
                            <b className="navbarDisable ms-2">Identifícate</b>
                        </div>
                    )
                }
            </Container>
        </Navbar>
    )
}