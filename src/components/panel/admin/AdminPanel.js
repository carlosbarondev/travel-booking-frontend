import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import { bookingClear } from "../../../actions/booking";
import { startLogout } from "../../../actions/auth";

export const AdminPanel = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(bookingClear());
        dispatch(startLogout());
        navigate("/");
    }

    return (
        <div className="animate__animated animate__fadeIn mt-4">
            <h5>Administración</h5>
            <div className="list-group">
                <button className="list-group-item list-group-item-action border-0 listaFondo" onClick={() => navigate("/panel/usuarios")}>Usuarios</button>
                <button className="list-group-item list-group-item-action border-0 listaFondo" onClick={() => navigate("/panel/hoteles")}>Hoteles</button>
            </div>
            <div className="d-grid">
                <Button variant="danger" className="mt-3" onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i> Cerrar sesión</Button>
            </div>
        </div>
    )
}