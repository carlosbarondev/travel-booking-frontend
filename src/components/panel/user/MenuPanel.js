import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";

import { startLogout } from "../../../actions/auth";
import { bookingClear } from "../../../actions/booking";

export const MenuPanel = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(bookingClear());
        dispatch(startLogout());
        navigate("/");
    }

    return (
        <div className="animate__animated animate__fadeIn mt-4">
            <h5>Mi cuenta</h5>
            <div className="list-group">
                <button className="list-group-item list-group-item-action border-0 listaFondo" onClick={() => navigate("/panel/datos")}>Mis datos</button>
                <button className="list-group-item list-group-item-action border-0 listaFondo" onClick={() => navigate("/panel/reservas")}>Reservas</button>
                <button className="list-group-item list-group-item-action border-0 listaFondo" onClick={() => navigate("/panel/valoraciones")}>Valoraciones</button>
            </div>
            <div className="d-grid">
                <Button variant="danger" className="mt-3" onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i> Cerrar sesión</Button>
            </div>
        </div>
    )
};