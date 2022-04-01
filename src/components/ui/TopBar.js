import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Container, Image, Navbar } from "react-bootstrap"
import ReactRoundedImage from "react-rounded-image";

export const TopBar = () => {

    const navigate = useNavigate();

    const { name, uid, role, img } = useSelector(state => state.auth);
    const { booking } = useSelector(state => state.booking);

    useEffect(() => { // Guarda la reserva en el localStorage cuando se modifica
        localStorage.setItem('booking', JSON.stringify(booking));
    }, [booking]);

    return (
        <Navbar style={{ "padding": "0", "margin": "0", "backgroundColor": "#003580" }}>
            <Container className="d-flex align-items-center" style={{ "height": "75px" }} fluid>
                <Navbar.Brand className="me-auto">
                    <Image
                        className="ms-1 ms-sm-5"
                        style={{ "height": "65px", "cursor": "pointer", "marginLeft": "-10px", "padding": "4px" }}
                        alt="logo"
                        src="/assets/logo.png"
                        onClick={() => navigate("/")}
                    />
                    <Image
                        className="p-1 navbarDisableImg"
                        style={{ "height": "55px", "cursor": "pointer", "marginLeft": "-15px" }}
                        alt="logo"
                        src="/assets/big_logo.png"
                        onClick={() => navigate("/")}
                    />
                </Navbar.Brand>
                <div className="me-1 me-sm-5">
                    {
                        (!!uid &&
                            <div className="d-flex align-items-center">
                                <Button
                                    variant="outline-light"
                                    onClick={() => navigate("/panel")}
                                    className="me-3"
                                >
                                    <div className="navbarDisable">
                                        {
                                            role === "USER_ROLE"
                                                ? <b>Mi Cuenta</b>
                                                : <b>Panel de Administración</b>
                                        }
                                    </div>
                                </Button>
                                <div onClick={() => navigate("/panel")} style={{ "cursor": "pointer" }}>
                                    {
                                        role === "USER_ROLE"
                                            ? img ? <ReactRoundedImage
                                                image={img ? img : "/assets/no-image.png"}
                                                roundedColor="#49c1e1"
                                                imageWidth="50"
                                                imageHeight="50"
                                                roundedSize="2"
                                                borderRadius="15"
                                            /> : <div><i className="fas fa-user" style={{ "fontSize": "30px", "color": "white" }}></i></div>
                                            : <i className="fa-solid fa-user-gear" style={{ "fontSize": "30px", "color": "white" }}></i>
                                    }
                                </div>
                            </div>
                        )
                        || (!uid &&
                            <div className="p-3">
                                <Button
                                    variant="outline-light"
                                    onClick={() => navigate("/login")}
                                    className="d-flex align-items-center"
                                >
                                    <i className="fas fa-sign-in-alt" style={{ "fontSize": "30px" }}></i>
                                    <b className="navbarDisable ms-2">Identifícate</b>
                                </Button>
                            </div>
                        )
                    }
                </div>
            </Container>
        </Navbar >
    )
}